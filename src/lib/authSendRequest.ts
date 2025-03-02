interface Theme {
  brandColor?: string;
  buttonText?: string;
}

interface VerificationRequestParams {
  identifier: string;
  provider: {
    apiKey: string;
    from: string;
  };
  url: string;
  theme: Theme;
}

export async function sendVerificationRequest(params: VerificationRequestParams) {
  const { identifier: to, provider, url, theme } = params;
  const { host } = new URL(url);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `Sign in to ${host}`,
      html: html({ url, host, theme }),
      text: text({ url, host }),
    }),
  });

  if (!res.ok)
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
}

function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params

  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor = theme.brandColor || "#1ca7ec"
  const color = {
    background: "#f4f7fa",
    text: "#333333",
    mainBackground: "#ffffff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#ffffff",
  }

  return `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <title>Sign in to ${escapedHost}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .sm-px-24 {
        padding-left: 24px !important;
        padding-right: 24px !important;
      }
      .sm-py-32 {
        padding-top: 32px !important;
        padding-bottom: 32px !important;
      }
      .sm-w-full {
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: ${color.background};">
  <div style="display: none;">Sign in to your CypheirPay account&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
    &#160;&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
    &#160;&#847; &#847; &#847; &#847; &#847; </div>
  <div role="article" aria-roledescription="email" aria-label="Sign in to ${escapedHost}" lang="en">
    <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" class="sm-px-24" style="background-color: ${color.background};">
          <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" class="sm-px-24">
                <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="sm-px-24" style="background-color: ${color.mainBackground}; border-radius: 4px; font-size: 16px; line-height: 24px; padding: 48px; text-align: left; color: ${color.text};">
                      <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Hey there!</p>
                      <p style="font-weight: 700; font-size: 20px; margin-top: 0; color: ${color.buttonBackground};">Welcome to CypheirPay</p>
                      <p style="margin: 24px 0;">
                        We received a request to sign in to your CypheirPay account. If this was you, you can sign in by clicking the button below:
                      </p>
                      <div style="margin: 32px 0; text-align: center;">
                        <a href="${url}" style="background-color: ${color.buttonBackground}; border-radius: 4px; color: ${color.buttonText}; display: inline-block; font-size: 16px; font-weight: 600; line-height: 1; padding: 16px 32px; text-decoration: none;">Sign in to CypheirPay</a>
                      </div>
                      <p style="margin: 24px 0;">
                        If you didn't request this email, there's nothing to worry about - you can safely ignore it.
                      </p>
                      <p style="margin: 24px 0;">
                        Thanks,<br>The CypheirPay Team
                      </p>
                      <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td style="padding-top: 32px; padding-bottom: 32px;">
                            <div style="background-color: #e5e7eb; height: 1px; line-height: 1px;">&zwnj;</div>
                          </td>
                        </tr>
                      </table>
                      <p style="margin: 0; font-size: 12px; line-height: 16px; color: #8e8ea0;">
                        This invitation was intended for you. If you were not expecting this invitation, you can ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch with us.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 48px;"></td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; text-align: center; color: #8e8ea0;">
                      <p style="margin: 0; font-style: italic;">Powered by CypheirPay</p>
                      <p style="margin: 0; margin-top: 4px;">Revolutionizing crypto payments</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
`
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
