const User = require('../model/UserModel');

class UserController {
// adming required []
    async store(req, res) {
        try {
            if (!req.body) {
                console.log("body request is required");
                console.log(req.body);
                return res.status(400).json({ message: "body request is required" });
            }
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);

        } catch (e) {
            console.log("Error creating user: ", e);
            res.status(400).json(e);
        }
    }
//  adminRequired []
    async index(req, res) {
        try {
           const users = await User.findAll({attributes: ['id','name','lastName','email']});
           if(!users){
            return res.status(400).json(e);
           }
           return res.status(200).json(users);

        } catch (e) {
            console.log("Error fetching users : ", e);
            res.status(400).json(e);
        }

    }
// login required [x]
    async show(req, res) {
        try {

            if(!req.userId){
               return res.status(400).json({message: "user id is required"});
            }
           
            const user = await User.findByPk(req.userId,{attributes: ['id', 'name','lastName', 'email']});
            

            if(!user){
               return res.status(400).json({message: "Error fetching user",
                error: "user not found"
               });
            }
            
            return res.status(200).json(user );

        } catch (e) {
            console.log("Error creating user: ", e);
            res.status(400).json(e);
        }

    }
// login required alterar rota [x]
    async update(req, res) {
        try {
            
            if(!req.userId){
               return res.status(400).json({message: "user id is required, token expired"});
            }
            if(!req.body){
               return res.status(400).json({message: "requisition body is required"});

            }
            const user = await User.findByPk(req.userId);

            if(!user){
               return res.status(400).json({message: "Error fetching user",
                error: "user not found"
               });
            }

            if(req.body.password === ''){
                return res.status(400).json(
                    {message: "password can not be null"}
                );
            }
            const updatedUser = await user.update(req.body);

            if(!updatedUser){
                 return res.status(400).json(
                    {message: "Error updating  user"}
                );
            }

            return res.status(200).json(updatedUser);
        } catch (e) {
            console.log("Error creating user: ", e);
            res.status(400).json(e);
        }

    }
a// admin required
    async delete(req, res) {
        try {
              if(!req.params.id){
               return res.status(400).json({message: "user id is required"});
            }
           
            const user = await User.findByPk(req.params.id);

            if(!user){
               return res.status(400).json({message: "Error fetching user",
                error: "user not found"
               });
            }

            await user.destroy();

            return res.status(204).json({msg: "User deletetion succeed"});

        } catch (e) {
            console.log("Error creating user: ", e);
            res.status(400).json(e);
        }

    }


}

module.exports = new UserController();