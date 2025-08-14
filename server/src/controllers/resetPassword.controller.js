import {
  findUserByEmail,
  generateResetToken,
  updateUserPassword,
  verifyResetToken,
} from "../services/resetPassword.service.js";


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // const token = generateResetToken(user._id);
    // const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    return res.status(200).json({
      message: "Reset link generated",
      resetURL: resetLink,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = verifyResetToken(token);
    const userId = decoded.userId;

    await updateUserPassword(userId, newPassword);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
