import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./terms.css"; // Add this import for custom CSS file
import Head from "next/head";

const Terms = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Biziffy</title>
        <meta
          name="description"
          content="Read the terms and conditions for using Biziffy. Understand your rights, responsibilities, and the rules for listing your business and using our platform."
        />
        <meta
          name="keywords"
          content="Biziffy terms and conditions, user agreement, business listing terms, listing rules, privacy agreement, Biziffy policies, service terms, legal disclaimer, platform usage, user responsibilities, business terms, registration terms, service usage guidelines, Biziffy rules, digital agreement"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Terms and Conditions | Biziffy" />
        <meta
          property="og:description"
          content="Review the legal terms of using Biziffy for business listings and lead generation. Stay informed and protected."
        />
        <meta
          property="og:url"
          content="https://biziffy.com/terms-and-conditions"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Biziffy" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms and Conditions | Biziffy" />
        <meta
          name="twitter:description"
          content="Understand the terms of using Biziffy services, including listing policies, user responsibilities, and legal agreements."
        />
        <meta name="twitter:creator" content="@biziffy" />
      </Head>

      <div className="py-3 terms-container">
        <div className="container">
          <h1 className="mb-4 terms-heading">
            Terms and Conditions for Bizi
            <span style={{ color: "var(--blue)" }}>ff</span>y
          </h1>
          <p className="terms-date">
            <strong>Effective Date : </strong> 25-11-2024
          </p>
          <div className="terms-main mb-4">
            <p>
              These Terms and Conditions (&quot;Agreement&quot;) govern the use
              of the Bizzify website (&quot;Website&quot;) and services offered
              by Bizzify Internet Marketing Pvt. Ltd. (&quot;Bizzify,&quot;
              &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing
              or using the Website and services, you agree to comply with and be
              bound by these Terms and Conditions. Please read these Terms and
              Conditions carefully. If you do not agree to these terms, do not
              use the Website or services.
            </p>
          </div>
          <div className="terms-main mb-4">
            <h4 className="terms-section-title">1. Acceptance of Terms</h4>
            <p>
              By accessing or using the Website or services provided by Bizzify,
              you agree to be legally bound by these Terms and Conditions.
              Bizzify reserves the right to modify or update these Terms at any
              time. When changes are made, we will update the effective date and
              post the revised Terms on this page. Your continued use of the
              Website after changes have been made constitutes your acceptance
              of the updated Terms.
            </p>
          </div>
          <div className="terms-main mb-4">
            <h4 className="terms-section-title">2. Registration and Account</h4>
            <p>
              To access certain features of the Website, such as listing a
              business or searching for businesses, you must create an account.
              When registering, you agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information.</li>
              <li>
                Maintain and promptly update your account information to ensure
                it remains accurate.
              </li>
              <li>
                Keep your account login details (email and password)
                confidential and notify Bizzify immediately of any unauthorized
                access to your account.
              </li>
              <li>
                You are solely responsible for any activities that occur under
                your account. Bizzify reserves the right to suspend or terminate
                your account at our discretion if we believe there has been a
                violation of these Terms.
              </li>
            </ul>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">3. User Obligations</h4>
            <p>
              <b>As a user of Bizzify, you agree to:</b>
            </p>
            <ul>
              <li>
                <b>Accurate Information:</b> Provide accurate, truthful, and
                complete personal and business information when registering and
                listing your business.
              </li>
              <li>
                <b>Lawful Use:</b> Use the Website and services only for lawful
                purposes and in accordance with applicable laws.
              </li>
              <li>
                <b>No Unlawful Content:</b> You must not upload, post, or
                transmit any unlawful, defamatory, offensive, or malicious
                content through the Website.
              </li>
              <li>
                <b>Non-Commercial Use:</b> You agree not to use the Website for
                unauthorized commercial purposes or to solicit business from
                other users.
              </li>
              <li>
                <b>Respect Other Users:</b> Do not engage in actions that
                disrupt or harm the Website&quot;s functionality or that
                interfere with other users&quot; ability to access or use the
                services.
              </li>
            </ul>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">4. Business Listings</h4>
            <p>
              Bizzify provides users with the ability to list businesses on the
              Website. By submitting a business listing, you agree to:
            </p>
            <ul>
              <li>
                Provide accurate and up-to-date information about your business.
              </li>
              <li>
                Ensure that the content of your listing complies with all
                applicable laws and regulations, including intellectual property
                rights, advertising standards, and consumer protection laws.
              </li>
              <li>
                Maintain the confidentiality of your business information if
                necessary, as Bizzify will not be responsible for any breaches
                of confidentiality.
              </li>
              <li>
                Accept that Bizzify has the right to remove or edit any business
                listing at its discretion if it violates any terms or is deemed
                inappropriate.
              </li>
            </ul>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">5. Payment Terms</h4>
            <p>
              Bizzify may offer premium services or features, such as featured
              business listings, access to additional functionalities, or
              subscription plans. If you choose to purchase such services, the
              following terms apply:
            </p>
            <ul>
              <li>
                <b>Pricing:</b> All prices for premium services will be clearly
                stated on the Website. Prices are subject to change with prior
                notice.
              </li>
              <li>
                <b>Payment Method:</b> Payments for premium services must be
                made through the available payment methods on the Website.
              </li>
              <li>
                <b>Billing Cycle:</b> Subscription services, if applicable, may
                be billed on a recurring basis. You agree to pay for the
                subscription fees according to the billing cycle specified.
              </li>
              <li>
                <b>Refund Policy:</b> No refunds will be provided for services
                that have been delivered or used. However, refunds may be
                provided at Bizzify&quot;s discretion in cases of billing errors
                or technical issues.
              </li>
              <li>
                <b>Taxes:</b> You are responsible for any applicable taxes,
                duties, or other charges imposed by government authorities in
                connection with your use of Bizzify&quot;s services.
              </li>
            </ul>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">
              6. Privacy and Data Protection
            </h4>
            <p>
              Your use of Bizzify&quot;s services is subject to our Privacy
              Policy, which governs how we collect, store, and use your personal
              and business data. By using our services, you consent to the
              practices outlined in the Privacy Policy.
            </p>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">7. Intellectual Property</h4>
            <ul>
              <li>
                <b>Bizzify&quot;s Ownership:</b> All content, trademarks, logos,
                designs, software, and other intellectual property related to
                Bizzify and the Website are owned by Bizzify Internet Marketing
                Pvt. Ltd. or its licensors and are protected by copyright,
                trademark, and other intellectual property laws.
              </li>
              <li>
                <b>User-Generated Content:</b> By posting content, business
                information, or any other material on the Website, you grant
                Bizzify a non-exclusive, royalty-free, worldwide license to use,
                display, modify, and distribute such content in connection with
                providing the services.
              </li>
            </ul>
          </div>
          <div className="terms-main mb-4">
            <h4 className="terms-section-title">8. Prohibited Conduct</h4>
            <ul>
              <li>
                Upload, post, or transmit any content that is illegal,
                fraudulent, abusive, or harmful.
              </li>
              <li>
                Use the Website to conduct any illegal activity, including
                identity theft, phishing, or spamming.
              </li>
              <li>
                Attempt to reverse engineer, decompile, or gain unauthorized
                access to Bizzify&quot;s services.
              </li>
              <li>
                Engage in actions that interfere with the functioning of the
                Website, including distributing viruses or other harmful
                software.
              </li>
            </ul>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">9. Termination</h4>
            <p>
              Bizzify reserves the right to suspend or terminate your access to
              the Website and services, without notice, for violations of these
              Terms or any other reason deemed necessary by Bizzify. Upon
              termination, your right to access the Website and use the services
              will immediately cease.
            </p>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">10. Limitation of Liability</h4>
            <p>
              Bizzify is not liable for any indirect, incidental, special,
              consequential, or punitive damages arising from the use or
              inability to use the Website, even if Bizzify has been advised of
              the possibility of such damages. Our total liability will be
              limited to the amount you have paid for the services that gave
              rise to the claim.
            </p>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">11. Disclaimers</h4>
            <p>
              <b>No Warranty:</b> Bizzify provides the Website and services
              &quot;as is&quot; and makes no warranties or representations
              regarding the quality, accuracy, or availability of the services.
              We disclaim all warranties, express or implied, including those
              related to merchantability or fitness for a particular purpose.
            </p>
            <p>
              <b>No Guarantee of Listings:</b> Bizzify does not guarantee that
              any business listing will be visible or rank high in search
              results or that it will generate business for you. All listings
              are subject to Bizzify&quot;s moderation and approval processes.
            </p>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">12. Indemnification</h4>
            <p>
              You agree to indemnify, defend, and hold harmless Bizzify, its
              directors, officers, employees, and agents from and against any
              claims, liabilities, damages, losses, and expenses (including
              legal fees) arising from your use of the Website and services,
              your violation of these Terms, or your infringement of any rights
              of third parties.
            </p>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">
              13. Governing Law and Dispute Resolution
            </h4>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of [Your Jurisdiction]. Any disputes arising under or in
              connection with these Terms shall be resolved through arbitration
              in accordance with [Arbitration Rules], and the arbitration shall
              be conducted in [Location].
            </p>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">14. Force Majeure</h4>
            <p>
              Bizzify will not be liable for any failure or delay in performance
              due to causes beyond our reasonable control, including acts of
              God, government actions, fire, earthquake, flood, strikes, or
              other similar events.
            </p>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">15. Severability</h4>
            <p>
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions will continue in full
              force and effect.
            </p>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">16. Entire Agreement</h4>
            <p>
              These Terms and Conditions, together with the Privacy Policy and
              any other legal notices or agreements published by Bizzify on the
              Website, constitute the entire agreement between you and Bizzify
              regarding the use of the Website and services.
            </p>
          </div>

          <div className="terms-main mb-4">
            <h4 className="terms-section-title">17. Contact Us</h4>
            <p>
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at:
            </p>
            <p>
              <strong>Bizzify Internet Marketing Pvt. Ltd.</strong>
            </p>
            <p>
              Address: SCO-93, 3rd Floor, Sector-7, Karnal, Haryana, Zip Code
              132002
            </p>
            <p>Phone: 9058373899</p>
            <p>Email: support@bizzify.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
