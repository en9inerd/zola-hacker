// Specify the IFTTT event name and Webhooks key before enabling this script through "monitor" property in _config.yml
(async function () {
  const EVENT_NAME = '';
  const WEBHOOKS_KEY = '';
  try {
    const { ip } = await fetch('https://api.ipify.org?format=json').then(res => res.json());
    const { href: url } = window.location;
    const screenDimensions = `${window.screen.width} x ${window.screen.height}`;
    const { referrer } = document;
    const { userAgent } = navigator;
    const strToSend = encodeURIComponent([
      `IP: ${ip}`,
      `URL: ${url}`,
      `Screen Dimensions: ${screenDimensions}`,
      `Referrer: ${referrer}`,
      `User Agent: ${userAgent}`
    ].join('<br>'));
    await fetch(`https://maker.ifttt.com/trigger/${EVENT_NAME}/with/key/${WEBHOOKS_KEY}?value1=${strToSend}`, {
      method: 'GET'
    });
  } catch (error) {
    console.error(error);
  }
})();
