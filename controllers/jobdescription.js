const UserModel = require("../models/user");
const JobDescriptionModel = require("../models/jobdescription");
const HttpException = require("../utils/HttpException");
const dotenv = require("dotenv");
dotenv.config();

class JobDescriptionController {
  getAll = async (req, res) => {
    let list = await JobDescriptionModel.find();
    res.send(list);
  };

  getById = async (req, res) => {
    const jobdescription = await JobDescriptionModel.findOne({ id: req.params.id });
    if (!jobdescription) {
      throw new HttpException(404, "JobDescription not found");
    }
    res.send(jobdescription);
  };

  getMyJobDescription = async (req, res) => {
    let listJobs = await JobDescriptionModel.find({ author: req.user.id });

    res.send(listJobs);
  };

  create = async (req, res) => {
    const { title, description, requirement, tag } = req.body;

    if (!title || !description || !requirement || !tag) throw new HttpException(500, "Fill all required feild: title, description, requirement, tag");

    const result = await JobDescriptionModel.create(req.body, req.user.id);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Jobs was created!");
  };

  updateUser = async (req, res) => {
    this.checkValidation(req);

    await this.hashPassword(req);

    const { confirm_password, ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await UserModel.update(restOfUpdates, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows ? "User not found" : affectedRows && changedRows ? "User updated successfully" : "Updated faild";

    res.send({ message, info });
  };

  deleteUser = async (req, res) => {
    const result = await UserModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "User not found");
    }
    res.send("User has been deleted");
  };

  userLogin = async (req, res) => {
    const { username, password: pass } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new HttpException(401, "User not exist!");
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new HttpException(401, "Incorrect password!");
    }

    // user matched!
    const accessToken = this.genToken(user);
    const refreshToken = this.genRefreshToken(user);
    await global.redisClient.rPush(user.id, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    // const secretKey = process.env.SECRET_JWT || "";
    // const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
    //   expiresIn: "24h",
    // });

    const { password, ...userWithoutPassword } = user;

    res.send({ ...userWithoutPassword, accessToken });
  };

  userLogout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new HttpException(401, "You are not auth");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) {
        throw new HttpException(401, "Refresh Token is not valid");
      }

      const rToken = await global.redisClient.lRange(user.id, 0, -1);
      if (!rToken || rToken.indexOf(refreshToken) == -1) {
        throw new HttpException(401, "Token is not exist");
      }

      const newRToken = rToken.filter((token) => token != refreshToken);
      await global.redisClient.del(user.id);
      await global.redisClient.lPush(user.id, newRToken);
      return res.clearCookie("refreshToken").send("log out success");
    });
  };

  refreshRToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
      return res.status(401).json("You are not auth");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) {
        return res.status(401).json("Refresh Token is not valid");
      }

      const rToken = await global.redisClient.lRange(user.id, 0, -1);
      if (!rToken || rToken.indexOf(refreshToken) == -1) {
        return res.status(401).json("Token is not exist");
      }

      // const newRToken = rToken.filter((token) => token != refreshToken);
      // await global.redisClient.del(user.id);
      // await global.redisClient.lPush(user.id, newRToken);

      const newAccessToken = this.genToken(user);
      await global.redisClient.rPush(user.id, newAccessToken);

      res.status(200).json(newAccessToken);
    });
  };

  // hash password if it exists
  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  };

  genToken = (user, expiresIn = "7d") => {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: expiresIn }
    );
  };

  genRefreshToken = (user, expiresIn = "365d") => {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: expiresIn }
    );
  };
}

module.exports = new JobDescriptionController();
