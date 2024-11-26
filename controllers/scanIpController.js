import axios from 'axios';
const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;

export const scanIpWithVirusTotal = async (req, res) => {
  const { ip } = req.body;

  try {
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
      {
        headers: {
          'x-apikey': VIRUSTOTAL_API_KEY,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: 'IP scan completed',
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error scanning IP',
    });
  }
};
