import { exec } from 'child_process'; // Used to run the StegExpose tool

export const scanSteganography = async (req, res) => {
  const { filePath } = req.body;

  try {
    exec(`StegExpose -C ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ success: false, message: stderr });
      }

      // Assuming the stdout contains a report of findings
      const findings = stdout;
      res.status(200).json({
        success: true,
        message: 'Steganography scan completed',
        data: findings,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error detecting steganography',
    });
  }
};
