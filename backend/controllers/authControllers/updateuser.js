const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const path = require('path');
const User = require(path.resolve(__dirname, '../../models/User'));


const updateuser = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
   }

   try {
      const user = await User.findOneAndUpdate(
         { _id: req.user.id },
         { username: req.body.username },
         { new: true }
      );

      if (!user) {
         return res.status(404).json({ success: false, error: "User not found" });
      }
      
      res.json({ success: true, user });
   } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
   }
}

module.exports = updateuser