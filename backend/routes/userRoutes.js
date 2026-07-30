// const  express = require('express')
// const router = express.Router()
// const bcrypt = require('bcrypt')
// const User = require('./Models/userModel');
// const jwt = require('jsonwebtoken');


// router.post('/signup', async (req, res) =>{
//     const existingUser = await User.find({email: req.body.email, phone: req.body.phone, })
//     if(existingUser.length > 0){
//         return res.status(409).json({ success: false, message:"User already exits"});
//     }
//     try{
//         const hashedPassword = await bcrypt.hash(req.body.password, 20)
//     const user = new User({
//         userName: req.body.userName,
//         email: req.body.email,
//         password: hashedPassword,
//         phone: req.body.phone
//     })
//     await user.save()
//     res.status(201).json({ success: true, message: 'User created successfully homie' });
//       } catch(e){
//         console.log(e);
//         res.status(500).json({ success: false, message: 'Something went wrong homie'});
//       }
// })

// router.post('/login', async (req,res ) =>{

//     const existingUser = await User.find({email: req.body.email, phone: req.body.phone, })
//     if(existingUser.length >=1 ){
//         // return res.status(409).json({ success: false, message:"User already exits"});

//          try{
//             const comparePassword =  await bcrypt.compare(
//                 req.body.password,
//                 existingUser[0].password
//             );

//             const token = await jwt.sign({email: existingUser[0].email}, process.env.JWT_SECRET,  {expiresIn:60 * 60} );


//             res.status(200).json({
//                 message: "Login was a success hehehehe",
//                 token
//             });
//          } catch(e){
//             console.log(e)
//             res.status(400).json({message: "Failed to login our homie"})
//          }
//     } else{
//         res.status(400).json({message:"Wrong email, password or phone number homie "})
//     }
//     // try{
//     //     const hashedPassword = await bcrypt.hash(req.body.password, 20)
//     //     const user = new userModel({
//     //         userName: req.body.userName,
//     //         email: req.body.email,
//     //         password: hashPassword,
//     //         phone: req.body.phone
//     //     })
//     //     await user.save();
//     //     res.status(200).json({message: "Registration was a success hehehehe"})
//     // } catch(e){
//     //     console.log(e)
//     //     res.status(406).json({message:"Failed to register our homie"});
//     // }
// })
// module.exports = router;
