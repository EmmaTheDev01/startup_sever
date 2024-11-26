import { exec } from 'child_process';

export const scanPorts = async (req, res) => {
  const { ip } = req.body;

  try {
    exec(`nmap ${ip}`, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ success: false, message: stderr });
      }

      const openPorts = stdout;
      res.status(200).json({
        success: true,
        message: 'Port scan completed',
        data: openPorts,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error performing port scan',
    });
  }
};
