import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | AI Tools Directory',
  description: 'Privacy Policy for AI Tools Directory - How we collect, use, and protect your personal information.',
  robots: 'index, follow',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                AI Tools Directory ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">We may collect personal information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name and email address (when you create an account or contact us)</li>
                <li>Tool submission information (when you submit AI tools for review)</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>IP address and location information</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website addresses</li>
                <li>Clickstream data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Cookies and Tracking Technologies</h3>
              <p className="text-gray-700 mb-4">
                We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities and improve your experience on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Process and respond to your inquiries and tool submissions</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Improve our website and develop new features</li>
                <li>Analyze usage patterns and trends</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Share Your Information</h2>
              <p className="text-gray-700 mb-4">We may share your information in the following circumstances:</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may share your information with third-party service providers who assist us in operating our website, conducting our business, or serving our users.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required by law, regulation, or court order, or if we believe disclosure is necessary to protect our rights or the rights of others.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Business Transfers</h3>
              <p className="text-gray-700 mb-4">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a structured format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restrict processing:</strong> Request limitation of processing your data</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies Policy</h2>
              <p className="text-gray-700 mb-4">
                We use cookies to enhance your browsing experience. You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Cookies We Use:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@ailooktools.dev<br />
                  <strong>Website:</strong> https://ailooktools.dev<br />
                  <strong>Address:</strong> [Your Business Address]<br />
                  <strong>Data Protection Officer:</strong> [DPO Contact Information]
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Specific Regional Provisions</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For EU/UK Residents (GDPR):</h3>
              <p className="text-gray-700 mb-4">
                Under the General Data Protection Regulation (GDPR), you have additional rights including the right to lodge a complaint with a supervisory authority if you believe your data protection rights have been violated.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">For California Residents (CCPA):</h3>
              <p className="text-gray-700 mb-4">
                Under the California Consumer Privacy Act (CCPA), California residents have the right to know what personal information is collected, sold, or disclosed, and the right to delete and opt-out of the sale of personal information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
