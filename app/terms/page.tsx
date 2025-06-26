import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | AI Tools Directory',
  description: 'Terms of Service for AI Tools Directory - Professional AI tools discovery platform.',
  robots: 'index, follow',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using AI Tools Directory ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                AI Tools Directory is a comprehensive platform that curates and showcases artificial intelligence tools, applications, and services. We provide information, reviews, and links to various AI tools to help users discover and evaluate AI solutions for their needs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-gray-700 mb-4">
                Some features of our service may require you to create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and current information</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Tool Submissions and Content</h2>
              <p className="text-gray-700 mb-4">
                When submitting AI tools or content to our platform, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>You have the right to submit the content</li>
                <li>The content is accurate and not misleading</li>
                <li>The content does not violate any third-party rights</li>
                <li>The content complies with applicable laws and regulations</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We reserve the right to review, modify, or remove any submitted content at our discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Acceptable Use Policy</h2>
              <p className="text-gray-700 mb-4">You agree not to use our service to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Submit false, misleading, or deceptive information</li>
                <li>Engage in any form of harassment or abuse</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Distribute malware, viruses, or harmful code</li>
                <li>Spam or send unsolicited communications</li>
                <li>Infringe on intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-4">
                The content, features, and functionality of AI Tools Directory, including but not limited to text, graphics, logos, images, and software, are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Links and Services</h2>
              <p className="text-gray-700 mb-4">
                Our platform may contain links to third-party websites and services. We are not responsible for the content, privacy policies, or practices of these third-party sites. Your use of third-party services is at your own risk and subject to their terms and conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers and Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Our service is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any information on our platform. To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a>, which also governs your use of our service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason, including if you breach these Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Email: legal@ailooktools.dev<br />
                  Website: https://ailooktools.dev<br />
                  Address: [Your Business Address]
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
