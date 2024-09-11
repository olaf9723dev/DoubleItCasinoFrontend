// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';

export default function TermsView() {
  const settings = useSettingsContext();

  return (
    <Stack sx={{ height: `100%` }}>
      <Stack
        sx={{
          height: `90px`,
          alignItems: 'center',
          borderBottom: `1px solid #272951`
        }}
      >
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Stack sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Stack
              sx={{
                height: `90px`,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottom: `1px solid #272951`,
                textAlign: 'center',
                gap: 5
              }}
            >
              <Typography sx={{ fontSize: 28, fontWeight: 400 }}>Terms Of Service</Typography>
            </Stack>
            <Stack
              sx={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 5.8
              }}
            >
              <Typography>FAQ</Typography>
              <Typography>Provably Fair</Typography>
            </Stack>
          </Stack>
        </Container>
      </Stack>

      <Scrollbar>
        <Stack
          sx={{
            mt: 2,
            p: 3.5,
            width: 1,
            height: '85%',
            borderRadius: 2,
            background: `linear-gradient(180deg, rgb(255 255 255 / 5%) 0%, rgb(255 255 255 / 12%) 100%)`,
            gap: 1
          }}
        >
          <Typography>
            STUDS ENTERTAINMENT LTD is the owner and operator of bloxflip.com and any affiliated
            websites and related mobile versions (“Bloxflip, us, our, ours, etc.”). Bloxflip is a
            skins betting service that allows users to play a variety of chance-based games
            (“Games”) using Roblox skins (“Limiteds”) and the virtual in-game currency used by
            players of Roblox (“Robux”). These Terms of Service are a legal contract that
            establishes the relationship between you, the user, (“you, your, yours, etc.”) and us as
            it relates to the services we provide to you through Bloxflip (“Services”), including
            all text, images, graphics, photographs, audio, video, buttons, icons, animations, data,
            messages, software, and other content, information, or materials on Bloxflip,
            (“Materials”), and any Materials posted to or otherwise shared on Bloxflip by you,
            primarily through our chatroom (“Content”).
          </Typography>
          <Typography>
            By accessing Bloxflip or using the Services, you accept and agree to our website
            policies, including these Terms of Service, and you certify to us that (i) you are
            eighteen (18) years of age or older, and are at least the age of majority in your
            jurisdiction, (ii) you are not a resident of Washington, (iii) you have the legal
            capacity to enter into and agree to these Terms of Service, (iv) you are using the
            Services freely, voluntarily, willingly, and for your own personal enjoyment, and (v)
            you will only provide accurate and complete information to us and promptly update this
            information as necessary to maintain its accuracy and completeness.
          </Typography>
          <Typography>
            We reserve the right to revise these Terms of Service at any time. You agree that we
            have this unilateral right, and that all modifications or changes are in force and
            enforceable immediately upon posting. The updated version supersedes any prior versions
            immediately upon posting, and the prior version is of no continuing legal effect unless
            the revised version specifically refers to the prior version and keeps the prior version
            or portions thereof in effect. We agree that if we change anything in these Terms of
            Service, we will change the “Last Updated” date at the top of these Terms of Service.
            You agree to re-visit this page on a frequent basis, and to use the “Refresh” button on
            your browser when doing so. You agree to note the date above. If the “Last Updated” date
            remains unchanged from the last time you reviewed these Terms of Service, then you may
            presume that nothing in these Terms of Service has changed since the last time you
            visited. If the “Last Updated” date has changed, then you must review the updated Terms
            of Service in their entirety. You must agree to any updated Terms of Service or
            immediately cease use of Bloxflip. If you fail to review these Terms of Service as
            required to determine if any changes have been made, you assume all responsibility for
            such omission, and you agree that such failure amounts to your affirmative waiver of
            your right to review the updated terms. We are not responsible for your neglect of your
            legal rights.
          </Typography>
          <Typography>
            We are not a gambling service, we do not take or place illegal bets, and we do not
            recommend or encourage illegal gambling. Instead, we offer entertaining online games
            involving skins betting which fall outside the prohibitions imposed by state and federal
            gambling laws. Gambling, whether in-person or online, is not legal in all areas. If you
            seek information regarding any illegal activity, you must leave Bloxflip immediately and
            shall not attempt to use the Services. You agree not to use the Services if doing so
            would violate the laws of your state, province, or country. Please consult with your
            local authorities or legal advisors before participating in online gaming of any kind.
            It is your sole and absolute responsibility to comply with all applicable laws, and you
            assume all risk in using the Services. Nothing on Bloxflip shall be construed as legal
            advice on any activity relating to gambling. You assume all risk and responsibility for
            your use of the Services. We bear no responsibility for your use of the Services in
            connection with illegal gambling activities, and we do not condone illegal gambling. You
            understand and agree that the Services are for entertainment purposes only. We make no
            guarantee that the Services are legal in your jurisdiction.
          </Typography>
          <Typography>1. Accounts</Typography>
          <Typography>A. Registration</Typography>
          <Typography>
            All users may create a single account on Bloxflip by signing in using their Roblox
            log-in credentials, provided you meet the requirements set forth herein and otherwise
            abide by these Terms of Service. Acceptance of registration is subject to our sole
            discretion.
          </Typography>
          <Typography>B. Accuracy</Typography>
          <Typography>
            If you provide any false, misleading, inaccurate, incomplete, not current, or otherwise
            incorrect information to us, or if you fail to promptly update such information to
            maintain its accuracy and completeness, or if we or any of our authorized agents have
            reasonable grounds to suspect that a violation of this provision has occurred, we have
            the right to suspend or terminate your account and refuse any and all current or future
            use of Bloxflip, as well as subjecting you to criminal and civil liability. While we may
            require you to provide additional information as necessary to verify the accuracy of
            your identity and the information you provide to us, you understand and agree that we do
            not sponsor or endorse any user or any Materials posted by our users.
          </Typography>
          <Typography>C. No Account Sharing</Typography>
          <Typography>
            You will not use, attempt to access, or ask for the login credentials for any third
            party’s account at any time. You will not allow any third party to access or use your
            account at any time, nor provide any third party with your login credentials. We will
            not be liable for any loss that we may incur as a result of any third party that uses
            your password or otherwise accesses your account, either with or without your knowledge.
            You will be liable for losses incurred by us or any third party due to release of
            account credentials to unauthorized persons.
          </Typography>
        </Stack>
      </Scrollbar>
    </Stack>
  );
}
