'use client';

import { useEffect } from 'react';

import Footer from '../section/Footer';
import Header from '../section/Header';

import { Container, H1, H2, H3, Link, Paragraph, Wrapper } from './styled';

const PrivacyPolicy = () => {
	useEffect(() => {
		setTimeout(() => {
			const el = document.getElementById(global.location?.hash.substring(1));
			if (el) el.scrollIntoView();
		}, 200);
	}, []);

	return (
		<Wrapper>
			<Header light />
			<Container>
				<div style={{ paddingTop: 100 }} id="policy">
					<H1>Privacy Policy</H1>
					<Paragraph>
						This privacy policy (“Policy”) describes how AiGO Labs. (“Company”,
						“we”, “our”, or “us”) collects, uses, shares, and stores personal
						information of users of its websites,{' '}
						<Link href="https://aigo.network">https://aigo.network</Link> and{' '}
						<Link href="https://app.aigo.network">
							https://app.aigo.network
						</Link>{' '}
						(the “Sites”). This Policy applies to the Sites, applications,
						products and services (collectively, “Services”) on or in which it
						is posted, linked, or referenced.
					</Paragraph>
					<Paragraph>
						By using the Services, you accept the terms of this Policy and our
						Terms of Use, and consent to our collection, use, disclosure, and
						retention of your information as described in this Policy. If you
						have not done so already, please also review our terms of use. The
						terms of use contain provisions that limit our liability to you and
						require you to resolve any dispute with us on an individual basis
						and not as part of any class or representative action. IF YOU DO NOT
						AGREE WITH ANY PART OF THIS PRIVACY POLICY OR OUR TERMS OF USE, THEN
						PLEASE DO NOT USE ANY OF THE SERVICES.
					</Paragraph>
					<H2>WHAT WE COLLECT</H2>
					<Paragraph>
						We get information about you in a range of ways.
					</Paragraph>
					<Paragraph>
						Information You Give Us. Information we collect from you may
						include:
						<li style={{ listStyle: 'outside' }}>
							Identity information, such as your first name, last name, username
							or similar identifier, title, date of birth and gender;
						</li>
						<li style={{ listStyle: 'outside' }}>
							Contact information, such as your postal address, email address
							and telephone number;
						</li>
						<li style={{ listStyle: 'outside' }}>
							Financial information, such as your credit card or other payment
							card details;
						</li>
						<li style={{ listStyle: 'outside' }}>
							Transaction information, such details about purchases you make
							through the Service and billing details;
						</li>
						<li style={{ listStyle: 'outside' }}>
							Usage information, such as information about how you use the
							Service and interact with us;
						</li>
						<li style={{ listStyle: 'outside' }}>
							Marketing information, such as your preferences for receiving
							marketing communications and details about how you engage with
							them;
						</li>
						<li style={{ listStyle: 'outside' }}>
							Financial information, such as bank account number and bank
							routing number; financial assets holdings;
						</li>
						<li style={{ listStyle: 'outside' }}>
							Technical information, such as your web3 wallet address,
							application programming interface (API)-key and network
							information regarding transactions.
						</li>
					</Paragraph>
					<Paragraph>
						Information We Get From Others. We may get information about you
						from other third party sources and we may add this to information we
						get from your use of the Services. Such information may include:
						<li>
							Registration using Single Sign-On Account: When registering some
							user accounts, you also have the option of using a single sign-on
							account (“SSO”). With an SSO, you can sign up for various
							different services and platforms with a single account. Some of
							our Sites currently offer you the opportunity to use the SSO
							services offered by Google, LLC, Amphitheatre Parkway, Mountain
							View, CA 94043, USA (“Google”). Google’s Privacy Policy and Terms
							of Use apply to the registration and use of the Google SSO
							service, see{' '}
							<Link href="https://policies.google.com/privacy">
								https://policies.google.com/privacy
							</Link>{' '}
							. Please note that the registration for and the use of SSO
							services are subject to the Google privacy policy and terms of
							use, which are beyond our control.
						</li>
					</Paragraph>
					<Paragraph>
						Information Automatically Collected. We may automatically record
						certain information about how you use our Sites (we refer to this
						information as “Log Data“). Log Data may include information such as
						a user’s Internet Protocol (IP) address, device and browser type,
						operating system, the pages or features of our Sites to which a user
						browsed and the time spent on those pages or features, the frequency
						with which the Sites are used by a user, search terms, the links on
						our Sites that a user clicked on or used, and other statistics. We
						use this information to administer the Service and we analyze (and
						may engage third parties to analyze) this information to improve and
						enhance the Service by expanding its features and functionality and
						tailoring it to our users’ needs and preferences.
					</Paragraph>
					<Paragraph>
						We also may use{' '}
						<a href="https://aws.amazon.com/pinpoint/">Amazon Point</a> to help
						us offer you an optimized user experience. Please note that AiGO
						Sites/Products only collect analytics data after got approved by
						user.
					</Paragraph>
					<Paragraph>
						Information we will never collect. We will never ask you to share
						your private keys or wallet seed. Never trust anyone or any site
						that asks you to enter your private keys or wallet seed.
					</Paragraph>

					<H2>USE OF PERSONAL INFORMATION</H2>
					<Paragraph>
						We will use your personal information in the following ways:
						<li style={{ listStyle: 'outside' }}>
							To enable you to access and use the Services
						</li>
						<li style={{ listStyle: 'outside' }}>
							To provide and deliver products and services that you may request.
						</li>
						<li style={{ listStyle: 'outside' }}>
							To process and complete transactions, and send you related
							information, including purchase confirmations and invoices
						</li>
						<li style={{ listStyle: 'outside' }}>
							To send information, including confirmations, technical notices,
							updates, security alerts, and support and administrative messages.
						</li>
					</Paragraph>

					<H3>To communicate with you</H3>
					<Paragraph>
						We use your personal information to communicate about promotions,
						upcoming events, and other news about products and services offered
						by us and our selected partners.
					</Paragraph>

					<H3>To optimize our platform</H3>
					<Paragraph>
						In order to optimize your user experience, we may use your personal
						information to operate, maintain, and improve our Services. We may
						also use your information to respond to your comments and questions
						regarding the Services, and to provide you and other users with
						general customer service.
					</Paragraph>

					<H3>With your consent</H3>
					<Paragraph>
						We may use or share your personal information with your consent,
						such as when you consent to let us post your testimonials or
						endorsements on our Sites, you instruct us to take a specific action
						with respect to your personal information, or you opt into third
						party marketing communications.
					</Paragraph>

					<H2>For compliance, fraud prevention, and safety</H2>
					<Paragraph>
						We may use your personal information to protect, investigate, and
						deter against fraudulent, unauthorized, or illegal activity.
					</Paragraph>

					<H2>SHARING OF PERSONAL INFORMATION</H2>
					<Paragraph>
						We do not share the personal information that you provide us with
						other organizations without your express consent, except as
						described in this Privacy Policy. We disclose personal information
						to third parties under the following circumstances:
					</Paragraph>
					<Paragraph>
						Affiliates. We may disclose your personal information to our
						subsidiaries and corporate affiliates (i.e. our family of companies
						that are related by common ownership or control) for purposes
						consistent with this Privacy Policy.
					</Paragraph>
					<Paragraph>
						Business Transfers. We may share personal information when we do a
						business deal, or negotiate a business deal, involving the sale or
						transfer of all or a part of our business or assets. These deals can
						include any merger, financing, acquisition, or bankruptcy
						transaction or proceeding.
					</Paragraph>
					<Paragraph>
						Compliance with Laws and Law Enforcement; Protection and Safety. We
						may share personal information for legal, protection, and safety
						purposes.
						<li style={{ listStyle: 'outside' }}>
							We may share information to comply with laws, including KYC and
							AML requirements.
						</li>
						<li style={{ listStyle: 'outside' }}>
							We may share information to respond to lawful requests and legal
							processes.
						</li>
						<li style={{ listStyle: 'outside' }}>
							We may share information to protect the rights and property of the
							Company, our agents, customers, and others. This includes
							enforcing our agreements, policies, and terms of use.
						</li>
						<li style={{ listStyle: 'outside' }}>
							We may share information in an emergency. This includes protecting
							the safety of our employees and agents, our customers, or any
							person.
						</li>
					</Paragraph>
					<Paragraph>
						Professional Advisors and Service Providers. We may share
						information with those who need it to do work for us. These
						recipients may include third party companies and individuals to
						administer and provide the Service on our behalf (such as bill and
						credit card payment processing, customer support, hosting, email
						delivery and database management services), as well as lawyers,
						bankers, auditors, and insurers.
					</Paragraph>
					<Paragraph>
						Other. You may permit us to share your personal information with
						other companies or entities of your choosing. Those uses will be
						subject to the privacy policies of the recipient entity or entities.
					</Paragraph>
					<Paragraph>
						We may also share aggregated and/or anonymized data with others for
						their own uses.
					</Paragraph>

					<H2>HOW INFORMATION IS SECURED</H2>
					<Paragraph>
						We retain information we collect as long as it is necessary and
						relevant to fulfill the purposes outlined in this privacy policy. In
						addition, we retain personal information to comply with applicable
						law where required, prevent fraud, resolve disputes, troubleshoot
						problems, assist with any investigation, enforce our Terms of Use,
						and other actions permitted by law. To determine the appropriate
						retention period for personal information, we consider the amount,
						nature, and sensitivity of the personal information, the potential
						risk of harm from unauthorized use or disclosure of your personal
						information, the purposes for which we process your personal
						information and whether we can achieve those purposes through other
						means, and the applicable legal requirements.
					</Paragraph>
					<Paragraph>
						In some circumstances we may anonymize your personal information (so
						that it can no longer be associated with you) in which case we may
						use this information indefinitely without further notice to you.
					</Paragraph>
					<Paragraph>
						We employ industry standard security measures designed to protect
						the security of all information submitted through the Services.
						However, the security of information transmitted through the
						internet can never be guaranteed. We are not responsible for any
						interception or interruption of any communications through the
						internet or for changes to or losses of data. Users of the Services
						are responsible for maintaining the security of any password,
						biometrics, user ID or other form of authentication involved in
						obtaining access to password protected or secure areas of any of our
						digital services. In order to protect you and your data, we may
						suspend your use of any of the Services, without notice, pending an
						investigation, if any breach of security is suspected.
					</Paragraph>

					<H2>INFORMATION CHOICES AND CHANGES</H2>

					<Paragraph>
						You may request access, a copy, modification or deletion of personal
						information that you have submitted to us by contacting us at{' '}
						<a href="mailto:admin@aigo.network">admin@aigo.network</a>. We will
						use reasonable efforts to accommodate such requests to the extent
						required by law, provided that we may be required to retain personal
						information to comply with legal obligations, accounting
						requirements, or for other business purposes. We may request
						additional information to verify the identity of the requesting
						party before responding to a request. Please note that copies of
						information that you have updated, modified or deleted may remain
						viewable in cached and archived pages of the Site for a period of
						time.
					</Paragraph>

					<H2>ELIGIBILITY</H2>
					<Paragraph>
						If you are under the age of majority in your jurisdiction of
						residence, you may use the Services only with the consent of or
						under the supervision of your parent or legal guardian. Consistent
						with the requirements of the Children’s Online Privacy Protection
						Act (COPPA), if we learn that we have received any information
						directly from a child under age 13 without first receiving his or
						her parent’s verified consent, we will use that information only to
						respond directly to that child (or his or her parent or legal
						guardian) to inform the child that he or she cannot use the Sites
						and subsequently we will delete that information.
					</Paragraph>

					<H2>MARKETING COMMUNICATIONS AND SHARING</H2>
					<Paragraph>
						You may instruct us not to use your contact information to contact
						you regarding services, promotions, surveys and special events that
						might appeal to your interests by contacting us using the
						information below. You can also opt out by following the
						instructions located at the bottom of any commercial emails messages
						you may receive.
					</Paragraph>
					<Paragraph>
						Please note that, regardless of your request, we may still use and
						share certain information as permitted by applicable law. For
						example, you may not opt out of certain operational emails, such as
						those reflecting our relationship or transactions with you, or
						important notifications regarding the Services we are providing to
						you, such as service-related announcements (e.g., if our Services
						are temporarily suspended for maintenance).
					</Paragraph>
					<Paragraph>
						Or, if you have downloaded our mobile application and enabled push
						notifications on your mobile device, we may send you alerts and
						notifications through push notifications, for example, to
						communicate status updates on our Services. However, you may choose
						to disable these notifications (except for the initial notification
						intended to verify your identity).
					</Paragraph>
					<H2>THIRD PARTY LINKS AND WEBSITES</H2>
					<Paragraph>
						This Privacy Notice does not address, and we are not responsible
						for, the privacy practices of any third parties, including those
						that operate websites to which our Sites link. The inclusion of a
						link on our Sites does not imply that we or our affiliates endorse
						the practices of the linked website.
					</Paragraph>
					<H2>CO-BRANDED WEBSITES</H2>
					<Paragraph>
						In the event that our Sites link to other websites that include our
						branding, this Privacy Notice does not apply to those other
						websites. Visitors to those websites are advised to carefully read
						the notices on those individual websites.
					</Paragraph>
					<H2>CHANGES TO THIS PRIVACY POLICY</H2>
					<Paragraph>
						We may change this privacy policy at any time. We encourage you to
						periodically review this page for the latest information on our
						privacy practices. If we make any changes, we will change the Last
						Updated date above.
					</Paragraph>
					<Paragraph>
						Any modifications to this Privacy Policy will be effective upon our
						posting of the new terms and/or upon implementation of the changes
						to the Sites (or as otherwise indicated at the time of posting). In
						all cases, your continued use of the Sites or Services after the
						posting of any modified Privacy Policy indicates your acceptance of
						the terms of the modified Privacy Policy.
					</Paragraph>
					<H2>CONTACT US</H2>
					<Paragraph>
						We welcome your comments or questions about this Policy, and you may
						contact us at:{' '}
						<Link href="mailto:admin@aigo.network">admin@aigo.network</Link>
					</Paragraph>
				</div>

				<div style={{ paddingTop: 100, marginBottom: 100 }} id="stop-trackings">
					<H1>Stop tracking</H1>
					<Paragraph>
						For account or personal data deletion request, please contact:{' '}
						<Link href="mailto:admin@aigo.network">admin@aigo.network</Link>
					</Paragraph>
				</div>
			</Container>
			<Footer />
		</Wrapper>
	);
};

export default PrivacyPolicy;
