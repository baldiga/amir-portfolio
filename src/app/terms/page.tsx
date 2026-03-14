export const metadata = {
  title: 'Terms & Conditions — Amir Baldiga',
  description: 'Terms and Conditions for amirbaldiga.com',
};

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-3xl mx-auto px-6 pt-36 pb-24">
        <h1 className="font-heading text-4xl font-bold mb-10">Terms &amp; Conditions</h1>
        <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>Affiliate Program Terms of Service</h2>
          <p>By signing up to be an Affiliate in the Amir Baldiga Affiliate Program (&quot;Program&quot;) you are agreeing to be bound by the following terms and conditions (&quot;Terms of Service&quot;).</p>
          <p>Amir Baldiga reserves the right to update and change the Terms of Service from time to time without notice.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>Account Terms</h2>
          <p>You must be 18 years or older to be part of this Program. You must be a human — accounts registered by &quot;bots&quot; or other automated methods are not permitted. You must provide your legal full name, a valid email address, and any other information requested in order to complete the signup process.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>Links/Graphics on Your Site</h2>
          <p>Once you have signed up for the Program, you will be assigned a unique Affiliate Code. You are permitted to place links, banners, or other graphics we provide with your Affiliate Code on your site, in your emails, or in other communications. We may change the design of the graphics at any time without notice, but we will not change the dimensions of the images without proper notice.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>Referral Fees / Commissions and Payment</h2>
          <p>For a referral to be eligible for a commission, the customer must complete a purchase using your Affiliate Code. The commission schedule and payment terms are set forth in the Affiliate Agreement.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>Term and Termination</h2>
          <p>The term of this Agreement will begin upon acceptance and will end when terminated. Either party may terminate this Agreement at any time, with or without cause, by giving written notice to the other party.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>Limitations of Liability</h2>
          <p>Amir Baldiga will not be liable for indirect, special, or consequential damages arising in connection with this Agreement. Our aggregate liability arising under this Agreement will not exceed the total referral fees paid or payable to you under this Agreement.</p>

          <h2 className="font-heading text-xl font-semibold mt-8 mb-3" style={{ color: 'var(--foreground)' }}>Arbitration</h2>
          <p>Any dispute relating in any way to this Agreement shall be submitted to confidential arbitration, except that to the extent either party has in any manner violated or threatened to violate the other party&apos;s intellectual property rights. The arbitration decision shall be final and binding.</p>
        </div>
      </div>
    </div>
  );
}
