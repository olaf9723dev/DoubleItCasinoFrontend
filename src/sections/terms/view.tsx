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
            Doubleit.casino Terms of Service Effective: September 2024 Doubleit.casino is a social
            gaming platform owned and operated by True Polygon Entertainment Limited (“Company”,
            “We”, “Us”, “Our”, “doubleit.casino”) with registered offices at 30, Peirarios, FL.: 1,
            Apt.: 1, 2023, Strovolos, Cyprus, registration number HE422125, through it’s related
            products and services (collectively known as the “Service(s)”) offered through
            Doubleit.casino and it’s affiliates is subject to the following Terms and Conditions
            (“Terms”, “Agreement”).
          </Typography>
          <Typography>
            doubleit.casino reserves the right to change or modify this Agreement at anytime at Our
            discretion. Changes made to this Agreement will be in effect as of the date of posting,
            indicated above.
          </Typography>
          <Typography>1. Acceptance of Terms</Typography>
          <Typography>
            These are all the Terms and Conditions governing the use of all the Services on
            doubleit.casino. It is an agreement between You the User and the Company. By accessing
            or using Services the User agrees to be bound by the Agreement as it is written here. If
            the User does not agree to the terms, they may not access the Services.
          </Typography>
          <Typography>
            By accessing or using the Services the User agrees that they are at least 18 years of
            age or older. If the User is not 18 years or older, they may not access the Services.
          </Typography>
          <Typography>
            A User may not use the Services if they are a resident of: Cyprus, the States of
            Washington and Nevada or any jurisdiction in which it is not legal for the User to use
            the Services.
          </Typography>
          <Typography>2. Account Restrictions Age</Typography>
          <Typography>
            Age: No one under the age of 18 is allowed to use the Services. If you suspect someone
            under the age of 18 is using Our Services, please reach out to Our support team.
          </Typography>
          <Typography>
            Location: It is the Users responsibility to ensure the Services being offered and their
            use of them is legal in their respective jurisdiction. Currently doubleit.casino does
            not offer Services in Cyprus, or the states of Nevada and Washington.
          </Typography>
          <Typography>
            Deposits: doubleit.casino offers a number of ways to fund the Users account. It is the
            User’s responsibility to ensure they are only using their own funds to fund their
            account. doubleit.casino can ban or suspend an account at anytime if financial fraud is
            suspected.
          </Typography>
          <Typography>
            Account Sharing: Users are strictly prohibited from sharing their doubleit.casino
            account with any other person or entity. Each account is for individual use only, and
            account sharing is considered a breach of these Terms of Service.
          </Typography>
          <Typography>
            Account Transfer: Transferring or attempting to transfer ownership or control of a
            doubleit.casino account to another individual or entity is strictly prohibited.
          </Typography>
          <Typography>
            Account Termination: Posting/taking part in prohibited conduct can cause an account to
            be removed.
          </Typography>
          <Typography>
            Engaging in any form of prohibited conduct, including but not limited to falsifying
            information to open an account or game, engaging in financial fraud, violating our terms
            of service or game rules, misrepresenting affiliation with any person or entity,
            attempting to investigate our software, threatening or harming other players or staff,
            interfering with the service's functionality, providing unauthorized payment
            information, engaging in unauthorized skin trading/buying/selling, or abusing rewards,
            will result in immediate termination of the User's account.
          </Typography>
          <Typography>
            In the event of any prohibited conduct, doubleit.casino reserves the right to suspend or
            terminate the User's access to our Services immediately without prior notice or
            liability for any reason.
          </Typography>
          <Typography>
            doubleit.casino reserves the right to ask the User for personal information in the event
            of suspected prohibited conduct.
          </Typography>
          <Typography>
            If a User's account is terminated, they may lose access to their account including but
            not limited to, all associated items, rewards, username, and play history.
          </Typography>
          <Typography>
            We, at doubleit.casino, take compliance seriously, and it is our commitment to providing
            a safe and responsible gaming experience for all our Users. By adhering to these Account
            Restrictions, Users contribute to maintaining the integrity and fairness of our online
            casino platform. Should you have any questions or concerns regarding these restrictions,
            please don't hesitate to contact our dedicated support team.
          </Typography>
          <Typography>3. Funds</Typography>
          <Typography>
            At doubleit.casino, We want to ensure clarity and transparency regarding the use and
            handling of funds. Please carefully read and understand the following points:
          </Typography>
          <Typography>
            Receiving UNT "Credits": When a User is funding their account, they acknowledge that
            they are acquiring UNT credits, which are strictly a monetary asset and cannot be
            refunded, it is an asset therefore it can change in value.
          </Typography>
          <Typography>
            Value of UNT "Credits": It is important to note that UNT credits hold monetary value,
            and they are solely intended for use within doubleit.casino gaming platform.
          </Typography>
          <Typography>
            Third Party Funding: For certain funding options, doubleit.casino utilizes third-party
            providers. The User is responsible for providing accurate and lawful information to
            these third-party providers when using the third-party services. The information
            provided by third-party services will be governed by the respected third-party’s Terms
            of Service.
          </Typography>
          <Typography>
            Crypto Funding: We offer the convenience of funding your account with various
            cryptocurrencies. Please be aware that all cryptocurrency deposits and withdrawals are
            considered final, and no refunds will be issued for deposits sent to incorrect public
            addresses.
          </Typography>
          <Typography>
            Non-Responsibility for Mainchain Accidents In Regards To Cryptocurrencies:
            doubleit.casino will not be held responsible for any accidental token transfers on a
            mainchain, including but not limited to ERC20, TRC20, or BRC20 tokens. It is the User’s
            responsibility to ensure they are sending the correct cryptocurrency on the right chain.
          </Typography>
          <Typography>
            Earning Free UNT Credits: Users have the opportunity to earn free UNT credits through
            different means, such as participating in Free unboxing, spinning the Daily Free
            (minimum level 15 required), and redeeming promo codes found online. These free UNT
            "credits" can be used to play games on our platform and cannot be withdrawn. They are
            safely stored in the User's Promo Wallet.
          </Typography>
          <Typography>
            Locked Free Credits: Any winnings from playing with credits in the Promo Wallet are
            locked until the User wagers at least 3x the value of the free credits. For example: If
            the user has 5 credits in their Promo Wallet and they wager them winning 50 credits.
            Those 50 credits will be locked for withdrawal until another 10 credits are wagered.
          </Typography>
          <Typography>
            If doubleit.casino discovers a user abusing or using free credit Services outside of how
            they were intended, we reserve the right to block a users ability to use this feature.
          </Typography>
          <Typography>
            Affiliate Rewards: doubleit.casino operates an affiliate program, and while Users can
            benefit from it, we reserve the right to modify or disable ownership of an affiliate
            code without prior notice. Additionally, in extreme cases of misuse or violation of our
            terms, doubleit.casino retains the right to confiscate affiliate earnings.
          </Typography>
          <Typography>
            We encourage our Users to fully understand these terms concerning funds and their usage
            within doubleit.casino. Our commitment is to maintain a fair, enjoyable, and responsible
            gaming environment.
          </Typography>
          <Typography>4. Games And Features</Typography>
          <Typography>
            doubleit.casino offers various exciting games and features for Users to enjoy. Please
            familiarize yourself with the following terms regarding these games:
          </Typography>
          <Typography>
            Provably Fair Policy: All games on doubleit.casino are governed by our provably fair
            policy, which ensures fair and transparent gameplay. Users can learn more about this
            policy through the provided link. Our provable fair policy consist of all games against
            the house have a 95% RTP. Most casinos have a range between 85% - 95% this means we are
            on theRules and Responsibility: Rules for each game may vary, and it is the User's
            responsibility to be familiar with the rules of the specific game they are playing. By
            participating in a game, the User agrees to abide by the rules for that game.
          </Typography>
          <Typography>
            Consequences of Rule Violation: If a User violates the rules of a game, their rewards
            will immediately be forfeited, and their account may be suspended or terminated.
          </Typography>
          <Typography>
            Right to Deny Access: doubleit.casino retains the right to deny a User access to any
            game at any time without prior notice.
          </Typography>
          <Typography>
            Invalidation of Games: Any game can become invalidated at anytime to prevent unfair or
            unlawful activity, among other reasons.
          </Typography>
          <Typography>Specific Game Features:</Typography>
          <Typography>
            Jackpot: A Users odds determined by the percentage of their wager compared to the total
            pot size.
          </Typography>
          <Typography>
            doubleit.casino retains up to 5% of each pot as a hosting fee for the service.
          </Typography>
          <Typography>Coin Flip:</Typography>
          <Typography>Users have a 50/50 chance to win.</Typography>
          <Typography>
            doubleit.casino retains up to 5% of each pot as a hosting fee for the service.
          </Typography>
          <Typography>Roulette:</Typography>
          <Typography>
            Users can use the Automated Betting feature while playing Roulette. Users are
            responsible for any actions taken with the Automated Betting option, and doubleit.casino
            will not be liable for game results resulting from its use. Refunds will not be given
            for accidental Automated Betting.
          </Typography>
          <Typography>Mine:</Typography>
          <Typography>
            Players can purchase cases with UNT credits and open them for a chance to win UNT
            credits.
          </Typography>
          <Typography>
            Items like a pitcher or a bomb will appear, if you win it will show in the form of a
            pitcher and if you lose it will show in the form of a bomb. Won in mine will represent
            their value in UNT credits.
          </Typography>
          <Typography>Case Battles:</Typography>
          <Typography>
            Multiple Users compete against each other to see which team opens the most value from
            various reward cases. In the event of a tie, rewards will be split among the Users.
          </Typography>
          <Typography>
            doubleit.casino aims to provide an enjoyable gaming experience while maintaining
            fairness and transparency. If you have any questions or require further information
            about our games and features, please feel free to contact our support team. Other Games:
            limbo, crash, and coinflip work similarly. Coinflip is a 1vs1 and the winner will
            receive all of it. Commissions will be taken before the game starts.{' '}
          </Typography>
          <Typography>
            Users can earn UNT TOKENS from using the Services. Users can use UNT TOKENS to enter
            into various games and lotteries with a chance to win more UNT TOKENS or UNT Credits.
          </Typography>
          <Typography>5. Results and Rewards</Typography>
          <Typography>
            At doubleit.casino, we value fairness and transparency in determining game results and
            providing rewards to our Users. It is essential that all participants understand the
            following terms related to results and rewards:
          </Typography>
          <Typography>
            Discretionary Rewards: We, at our sole discretion, determine the distribution of rewards
            among Users. This ensures that the distribution process is fair and in line with our
            policies.
          </Typography>
          <Typography>
            Reversal of Results: In certain cases, results can be reversed after a game has
            concluded due to valid reasons. Such instances are handled carefully to maintain the
            integrity of our gaming platform.
          </Typography>
          <Typography>
            Delayed or Cancelled Rewards: Rewards can be subject to delay or cancellation if a User
            violates this Agreement, even after the rewards have been initially given out.
          </Typography>
          <Typography>
            Dispute Resolution: In any disputes arising from the use of Our Services,
            doubleit.casinoacts as the final authority, and all players are required to cooperate
            with the outcomes determined by doubleit.casino.
          </Typography>
          <Typography>
            Right to Cancel Participation: doubleit.casino reserves the right to cancel a User's
            ability to participate in a game or use Our Services entirely if We determine that the
            User's actions are improper, unfair, fraudulent, or detrimental to other Users. Improper
            actions may include but are not limited to falsifying personal information, violating
            eligible payment method terms, using unauthorized scripts or automated means, tampering
            with the administration or computer programs associated with the Service, obtaining
            other entrants' information and engaging in abusive or harassing behavior.
          </Typography>
          <Typography>
            Force Majeure: We acknowledge that certain unforeseen events or circumstances, such as
            acts of God, war, fire, riot, earthquake, terrorism, or actions of governmental
            authorities outside our control, can impact our ability to comply with the Terms. In
            such cases, we will not be considered in breach of these Terms.
          </Typography>
          <Typography>
            Prizes Offered: All prizes and rewards offered by doubleit.casino are provided solely in
            the form of UNT credits, which can be used within our gaming platform.
          </Typography>
          <Typography>
            Additional Rewards: Apart from standard rewards from winning a game, we offer other
            enticing rewards, such as the "Whale Watch" program, where Users who wager the most
            during a week are rewarded, and the "Cashback" program, allowing Users to earn credits
            back based on their total wagers.
          </Typography>
          <Typography>6. Responsible Gambling</Typography>
          <Typography>
            doubleit.casino acknowledges the importance of responsible gambling and the potential
            risks of gambling addiction. We are committed to promoting a safe and responsible gaming
            environment for all Users. To this end, we offer a "Self-Exclusion" feature that allows
            Players to take a break from the platform if they feel the need to do so.
          </Typography>
          <Typography>
            Self-Exclusion Option: We understand that Users may wish to take a break from gambling.
            For this reason, we provide the option for Users to set a "Self-Exclusion" period of a
            specified duration
          </Typography>
          <Typography>
            Self-Exclusion Effects: When a User enters a Self-Exclusion period, their ability to
            deposit, withdraw, claim rewards, and participate in games will be disabled for the
            duration of the specified time.
          </Typography>
          <Typography>
            No Override of Self-Exclusion: It's important to note that doubleit.casino is unable to
            override a User's Self-Exclusion period. Users will need to wait for the designated
            period to pass before their account is no longer in Self-Exclusion mode.
          </Typography>
          <Typography>
            doubleit.casino takes responsible gambling seriously and encourages Users to make use of
            the Self-Exclusion feature if they believe it's necessary. Our goal is to ensure that
            our platform remains a fun and enjoyable place for entertainment, while also providing
            the necessary tools to promote responsible gambling practices.
          </Typography>
          <Typography>7. 3rd Party Links</Typography>
          <Typography>
            At doubleit.casino, We may occasionally provide links to websites that are located
            outside of our domain as part of our Services. It is essential for Users to understand
            the following with regards to these third-party links.
          </Typography>
          <Typography>
            External Website Content: These external websites are not under our control, and we do
            not have the ability to manage or modify the content present on these sites.
          </Typography>
          <Typography>
            No Responsibility: doubleit.casino does not take responsibility for the content,
            accuracy, legality, or availability of the information, products, or services offered on
            these third-party websites.
          </Typography>
          <Typography>
            User's Discretion: The decision to access any third-party links is solely at the User's
            discretion and risk. Any interactions, transactions, or engagements with these external
            sites are entirely the responsibility of the User.
          </Typography>
          <Typography>
            Loss or Damage: doubleit.casino shall not be held liable for any loss or damage that may
            arise from the User's use of these third-party links. Users are advised to exercise
            caution and read the terms of use and privacy policies of such external websites before
            engaging with them.
          </Typography>
          <Typography>
            Termination of Links: While We strive to ensure the quality of external links, We
            reserve the right to remove or terminate any third-party links from Our Services at any
            time without prior notice. At doubleit.casino, we are committed to providing a secure
            and enjoyable gaming environment. By understanding and acknowledging the nature of
            third-party links, Users can make informed decisions and safely explore additional
            content beyond our domain.
          </Typography>
          <Typography>8. No warranties</Typography>
          <Typography>
            At doubleit.casino, we want our Users to be aware of the following important disclaimers
            regarding the use of our website, its content, and any services or items obtained
            through the website:
          </Typography>
          <Typography>
            Use at Your Own Risk: Your use of the website, its content, and any services or items
            obtained through the website is entirely at your own risk. doubleit.casino does not
            guarantee or warrant the suitability, accuracy, or reliability of the website or its
            content.
          </Typography>
          <Typography>
            "As Is" and "As Available" Basis: The website, its content, and any services or items
            obtained through the website are provided on an "as is" and "as available" basis,
            without any warranties of any kind, whether express or implied.
          </Typography>
          <Typography>
            Completeness and Security: Neither the Company nor any person associated with the
            Company makes any warranty or representation with respect to the completeness, security,
            reliability, quality, accuracy, or availability of the website.
          </Typography>
          <Typography>
            Uninterrupted and Error-Free: doubleit.casino does not represent or warrant that the
            website, its content, or any services or items obtained through the website will be
            accurate, reliable, error-free, or uninterrupted. We do not guarantee that defects will
            be corrected or that the website or the server that makes it available are free of
            viruses or other harmful components.
          </Typography>
          <Typography>
            Meeting Your Needs or Expectations: doubleit.casino does not warrant that the website or
            any services or items obtained through the website will meet your specific needs or
            expectations.
          </Typography>
          <Typography>
            Disclaimer of All Warranties: The Company hereby disclaims all warranties of any kind,
            whether express or implied, statutory or otherwise, including but not limited to any
            warranties of merchantability, non-infringement, and fitness for a particular purpose.
          </Typography>
          <Typography>
            Exclusion of Certain Warranties: The foregoing disclaimer does not affect any warranties
            that cannot be excluded or limited under applicable law.
          </Typography>
          <Typography>
            At doubleit.casino, while we make every effort to provide a secure and reliable
            platform, we cannot guarantee absolute perfection, and we advise our Users to exercise
            caution and use our website responsibly. By acknowledging these disclaimers, Users
            accept the inherent risks associated with online gaming and agree to use our Services
            responsibly and at their own discretion.
          </Typography>
          <Typography>9. Steam/Valve Affiliation</Typography>
          <Typography>
            doubleit.casino wants to clarify the relationship between our website and Steam, as well
            as any other trademarks associated with Valve Corporation.
          </Typography>
          <Typography>
            Non-Affiliation with Steam: doubleit.casino is not affiliated with, endorsed by, or
            associated with Steam or any other trademarks owned by Valve Corporation.
          </Typography>
          <Typography>
            We want to ensure transparency and honesty in our communication with our Users.
            doubleit.casino is an independent online casino platform and operates separately from
            Steam and Valve Corporation. While we may offer certain gaming services related to Valve
            Corporation's games, it is essential to understand that our website is entirely separate
            from the Steam platform.
          </Typography>
          <Typography>10. Errors/Glitches</Typography>
          <Typography>
            Non-Entitlement to Rewards or Refunds: In the event of any interface errors or
            manipulation, Users are not entitled to claim game rewards or refunds based on these
            occurrences.
          </Typography>
          <Typography>11. Governing Laws</Typography>
          <Typography>
            The legal framework governing the use of doubleit.casino and its Services is based on
            the laws of the State of Delaware.
          </Typography>
          <Typography>
            Jurisdiction: By accessing and using doubleit.casino, Users acknowledge and agree that
            any disputes or legal matters arising from or related to the use of our website will be
            subject to the laws of the State of Delaware.
          </Typography>
          <Typography>
            Venue: Any legal proceedings, actions, or disputes shall be initiated and maintained in
            the appropriate courts situated within the State of Delaware.
          </Typography>
          <Typography>
            Consent to Jurisdiction: Users consent to the jurisdiction of the courts of the State of
            Delaware and agree to submit to the personal jurisdiction and venue of such courts for
            the resolution of any legal matters pertaining to doubleit.casino.
          </Typography>
          <Typography>12. Copyright</Typography>
          <Typography>
            doubleit.casino values intellectual property rights and wants its Users to be aware of
            the following copyright-related terms:
          </Typography>
          <Typography>
            Ownership and License: All content on doubleit.casino, including but not limited to
            images, software, names, logos, graphics, and virtual goods, is either owned or licensed
            by doubleit.casino. Such content is protected by copyright and other intellectual
            property laws.
          </Typography>
          <Typography>
            Respect for 3rd Party Intellectual Property: doubleit.casino does not claim ownership of
            any intellectual property owned by third parties. We respect the copyrights of others
            and expect our Users to do the same.
          </Typography>
          <Typography>
            Non-Commercial Use: Users are strictly prohibited from accessing or using any part or
            materials available on doubleit.casino for commercial purposes. The content provided on
            our website is for personal and non-commercial use only.
          </Typography>
          <Typography>13. Marketing</Typography>
          <Typography>
            doubleit.casino values the support of its Users and wants to be transparent about the
            use of certain information for marketing and promotional purposes. Please read the
            following terms:
          </Typography>
          <Typography>
            Use of User Information: By participating on doubleit.casino, Users agree to the use of
            specific information, including but not limited to their username, profile picture,
            city, and state, for promotional and marketing materials related to doubleit.casino,
            except where prohibited by law.
          </Typography>
          <Typography>
            Public Sharing of Information: Users agree that their information may be shared publicly
            during or following a game for the purpose of promoting doubleit.casino.
          </Typography>
          <Typography>
            Comments and Feedback Property: Any comments or feedback provided by Users to
            doubleit.casino becomes the property of the Company. Unless otherwise prohibited by law,
            doubleit.casino may use, sell, exploit, and disclose any ideas in any manner without
            restriction and without providing compensation to the User.
          </Typography>
          <Typography>14. Code Of Conduct</Typography>
          <Typography>
            At doubleit.casino, We strive to maintain a respectful and safe environment for all
            Users. To ensure a positive experience for everyone, We expect all Users to adhere to
            the following Code of Conduct:
          </Typography>
          <Typography>
            Lawful Use: Users agree not to use doubleit.casino or any of its affiliated services for
            unlawful purposes or in a manner that violates this Agreement.
          </Typography>
          <Typography>
            Prohibited Actions: Users are strictly prohibited from engaging in the following
            actions:
          </Typography>
          <Typography>Planning or participating in illegal activities.</Typography>
          <Typography>
            Posting or causing to be posted any content that is infringing, libelous, defamatory,
            abusive, obscene, pornographic, or otherwise violates the law or the rights of
            doubleit.casino, its Users, or any third-party.
          </Typography>
          <Typography>Threatening, harassing, or intimidating any other Users.</Typography>
          <Typography>
            Using any automated means, including bots or scrapers, to participate in doubleit.casino
            or any affiliated Services for any purpose.
          </Typography>
          <Typography>
            Abusing the reporting system or creating false or misleading reports.
          </Typography>
          <Typography>
            Using a false identity or attempting to impersonate another person.
          </Typography>
          <Typography>Creating more than one (1) account per User.</Typography>
          <Typography>Selling or transferring their account to another party.</Typography>
          <Typography>
            Consequences of Violation: Violating any of the above-stated rules may result in the
            suspension or termination of a User's account and may also lead to legal action, if
            necessary.
          </Typography>
          <Typography>
            We are committed to maintaining a respectful and fair gaming community for all Users. By
            adhering to this Code of Conduct, Users contribute to creating a positive and enjoyable
            atmosphere for everyone. If you encounter any violations or have concerns related to the
            Code of Conduct, please report them to our support team for appropriate action.
          </Typography>
          <Typography>
            doubleit.casino appreciates the cooperation of all Users in upholding these guidelines
            to ensure a welcoming and safe environment for all members of our platform.
          </Typography>
          <Typography>15. Limitation of liability</Typography>
          <Typography>
            At doubleit.casino, it is essential for Users to understand the limitations of liability
            associated with the use of our platform. Please read the following terms:
          </Typography>
          <Typography>
            Use at Sole Discretion and Risk: Users acknowledge and agree that the use of
            doubleit.casino is solely at their own discretion and risk.
          </Typography>
          <Typography>
            "As Is" and "As Available" Basis: doubleit.casino is provided on an "as is" and "as
            available" basis. There is no guarantee that specific results may be obtained from using
            our platform.
          </Typography>
          <Typography>
            No Guarantee of Continuous or Uninterrupted Access: doubleit.casino does not guarantee
            continuous, uninterrupted, or secure access to its services or any aspect thereof.
          </Typography>
          <Typography>
            No Liability for Indirect or Consequential Damages: Users understand and agree that
            neither doubleit.casino nor its affiliates shall be liable for any indirect, incidental,
            special, consequential, or exemplary damages. This includes damages for loss of profits,
            goodwill, use, data, or other intangible losses, even if doubleit.casino or its
            affiliates had been advised of the possibility of such damages.
          </Typography>
          <Typography>
            Limited Liability: Notwithstanding anything to the contrary, doubleit.casino's liability
            to Users for any cause whatsoever will at all times be limited to the amount paid, if
            any, by the User to doubleit.casino for the use of the platform during the term of their
            registration, excluding any fees paid for services and/or products rendered before the
            circumstances giving rise to the claim.
          </Typography>
          <Typography>
            Responsibility for Lost Funds, Hacked Accounts, or Accidental Withdrawals:
            doubleit.casino is not responsible for any lost funds, hacked accounts, or accidental
            withdrawals experienced by Users. It is the User's responsibility to secure their
            account and take necessary precautions.
          </Typography>
          <Typography>16. System Maintenance</Typography>
          <Typography>
            doubleit.casino conducts periodic maintenance work on its systems to ensure the security
            and integrity of the platform. During these maintenance periods, certain features or all
            functionalities of doubleit.casino may be temporarily unavailable. We want our Users to
            be aware of the following important points regarding system maintenance:
          </Typography>
          <Typography>
            Purpose of Maintenance: The primary purpose of system maintenance is to enhance the
            security and reliability of doubleit.casino, ensuring a safe and seamless gaming
            experience for our Users.
          </Typography>
          <Typography>
            Limited Availability during Maintenance: During maintenance periods, a portion or all
            features of doubleit.casino may not be accessible to Users. We strive to minimize any
            inconvenience caused during these periods.
          </Typography>
          <Typography>
            Advance Notice: Whenever possible, doubleit.casino will provide advance notice to Users
            about upcoming maintenance periods. However, Users acknowledge and agree that
            doubleit.casino may perform updates or maintenance with or without prior notification.
          </Typography>
          <Typography>
            Right to Modify or Discontinue: doubleit.casino reserves the right to modify or
            discontinue any aspect of the website, including the availability of features, content,
            and contests, at any time and without prior notice.
          </Typography>
          <Typography>
            Limitation or Restriction of Features: doubleit.casino may impose limitations on certain
            features or offerings, or restrict access to parts or all of the website, with or
            without notice to Users and without any liability to Users or any third-party.
          </Typography>
          <Typography>
            At doubleit.casino, we are committed to maintaining a high standard of performance and
            security for our Users. While we strive to inform Users about maintenance activities, we
            also reserve the right to take necessary measures without prior notice to ensure the
            best user experience.
          </Typography>
          <Typography>17. Disputes</Typography>
          <Typography>
            In the event of any disputes or legal matters arising from the use of doubleit.casino,
            Users acknowledge and agree that such disputes shall be handled by the state of Delaware
            and governed by its laws.
          </Typography>
          <Typography>
            Jurisdiction: Users consent to the jurisdiction of the courts located within the state
            of Delaware for the resolution of any disputes or legal proceedings related to
            doubleit.casino.
          </Typography>
          <Typography>
            Applicable Laws: Any disputes shall be governed by the laws of the state of Delaware.
          </Typography>
          <Typography>18. Privacy and AML</Typography>
          <Typography>
            doubleit.casino places a high priority on User privacy and compliance with Anti-Money
            Laundering regulations. Please review the following terms related to Privacy and AML:
          </Typography>
          <Typography>
            Collection of Personal Information: By using doubleit.casino, Users agree to the
            collection of their personal information for the purpose of providing a good user
            experience and ensuring a safe environment for all Users.
          </Typography>
          <Typography>
            Additional Information Requirement: doubleit.casino may, from time to time, require
            additional information from Users to ensure compliance with this agreement and relevant
            regulations.
          </Typography>
          <Typography>
            Sharing of Information with Third Parties: Users acknowledge and agree that information
            provided to doubleit.casino may be shared with third parties. Such sharing may only
            occur when necessary for processing User requests, conducting verification services, or
            as required by law.
          </Typography>
          <Typography>
            doubleit.casino will never sell or share your personal information with marketers or for
            profit.
          </Typography>
          <Typography>
            Updating Personal Information: Users are responsible for informing doubleit.casino
            promptly in the event of any changes to their personal information.
          </Typography>
          <Typography>
            doubleit.casino is committed to safeguarding the privacy and security of User data while
            adhering to applicable laws and regulations. By agreeing to these terms, Users consent
            to the collection and handling of their personal information as described herein.
          </Typography>
          <Typography>19. Other Provisions</Typography>
          <Typography>
            doubleit.casino may publish additional policies related to specific services offered on
            the platform. Users should be aware that this agreement extends to any other published
            policies related to doubleit.casino and its services. These supplemental policies are
            designed to provide further guidance and rules that govern specific aspects of the
            website and its Services.
          </Typography>
          <Typography>By using doubleit.casino you agree to the Terms of Service.</Typography>
        </Stack>
      </Scrollbar>
    </Stack>
  );
}
