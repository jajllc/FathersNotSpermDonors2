import React, { useState } from 'react';
import { FileText, Send, CheckCircle, Users } from 'lucide-react';

interface PetitionFormProps {
  onSubmit: () => void;
}

export const PetitionForm: React.FC<PetitionFormProps> = ({ onSubmit, submitted }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    isFather: false,
    shareStory: false,
    message: ''
  });

  const [signatureCount, setSignatureCount] = useState(48742);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitted) {
      setSignatureCount(prev => prev + 1);
      onSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (submitted) {
    return (
      <section id="petition" className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Support!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Your signature has been added to our petition. Together, we're making a difference 
              for fathers' rights and children's well-being.
            </p>
            <div className="bg-green-100 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center space-x-2 text-green-800">
                <Users className="h-6 w-6" />
                <span className="text-2xl font-bold">{signatureCount.toLocaleString()}</span>
                <span className="text-lg">signatures and counting!</span>
              </div>
            </div>
            <p className="text-gray-600">
              Share this page with friends and family to help us reach our goal of 100,000 signatures.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="petition" className="py-20 bg-blue-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <div className="mb-8">
            <img 
              src="https://images.pexels.com/photos/1157394/pexels-photo-1157394.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Father and son"
              className="w-32 h-32 object-contain rounded-full mx-auto shadow-lg border-4 border-amber-400 bg-gray-100"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
            Join Our Movement
          </h2>
          <p className="text-lg sm:text-xl text-blue-50 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Sign our petition to support equal rights for fathers and advocate for 
            meaningful legal reform that recognizes fathers as full parents, not just biological contributors.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-2 text-white">
              <Users className="h-5 w-5" />
              <span className="text-2xl font-bold">{signatureCount.toLocaleString()}</span>
              <span>people have signed</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              Our Petition Statement
            </h3>
            <div className="bg-gray-50 rounded-lg p-8 text-gray-800">
              <p className="mb-6 text-lg leading-relaxed font-medium">
                "We, the undersigned, call for comprehensive reform of family law to ensure equal treatment of fathers in custody proceedings and parental rights cases. We demand that courts recognize that fatherhood is not simply a title, but a set of vital responsibilities — nurturing, guiding, protecting, and providing for children. Fathers are not bystanders or donors; they are committed parents who shoulder equal responsibility for their children's emotional, physical, and intellectual development. It is time our legal system reflects this truth and protects the rights that allow fathers to fulfill these responsibilities. Fathers have the right not just to be called a dad, but to truly be dads in every sense of the word."

              </p>
              <p className="text-lg leading-relaxed font-medium">
               1. Poverty & Economic Instability<br />
• Children in father-absent homes are 4x more likely to live in poverty.<br />
• In the U.S., about 44% of children in fatherless homes live below the poverty line, compared to 12% in two-parent households.
              </p>
              <p className="text-lg leading-relaxed font-medium">
                2. Education & Academic Struggles<br />
• Fatherless children are 2x more likely to drop out of high school.<br />
• They score lower on reading, math, and critical thinking tests.<br />
• Kids without fathers are more likely to repeat grades and less likely to pursue higher education.
              </p>
              <p className="text-lg leading-relaxed font-medium">
              3. Emotional & Behavioral Health<br />
• 70% of youth in state institutions (juvenile detention, etc.) come from fatherless homes.<br />
• Father absence is strongly linked to higher rates of depression, anxiety, and suicidal ideation.<br />
• Boys in particular show more aggression and higher risks of delinquency; girls are more prone to early sexual activity and teenage pregnancy.
                </p>
                 <p className="text-lg leading-relaxed font-medium">
              4. Crime & Incarceration<br />
• 85% of youth in prison grew up without a father.<br />
• Fatherless children are 2–3x more likely to commit crimes.
                </p>
                <p className="text-lg leading-relaxed font-medium">
              5. Substance Abuse<br />
• Teens in father-absent households are significantly more likely to abuse alcohol and drugs.
                </p>
               <p className="text-lg leading-relaxed font-medium">
              6. Relationships & Future Parenting<br />
• Father absence increases the likelihood of divorce or unstable relationships later in life.<br />
• Sons without fathers are less likely to become involved, nurturing fathers themselves.<br />
• Daughters without fathers are more likely to experience unstable partnerships and teen pregnancies.
                </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-base font-semibold text-gray-800 mb-3 tracking-wide">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="accessible-input w-full"
                  placeholder="Your first name"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-base font-semibold text-gray-800 mb-3 tracking-wide">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="accessible-input w-full"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-base font-semibold text-gray-800 mb-3 tracking-wide">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="accessible-input w-full"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-base font-semibold text-gray-800 mb-3 tracking-wide">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="accessible-input w-full"
                  placeholder="12345"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFather"
                  name="isFather"
                  checked={formData.isFather}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-400 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="isFather" className="ml-4 text-gray-800 text-lg leading-relaxed font-medium">
                  I am a father affected by these issues
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="shareStory"
                  name="shareStory"
                  checked={formData.shareStory}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-400 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="shareStory" className="ml-4 text-gray-800 text-lg leading-relaxed font-medium">
                  I'm willing to share my story (optional)
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-base font-semibold text-gray-800 mb-3 tracking-wide">
                Additional Comments (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="accessible-input w-full resize-none min-h-[120px]"
                placeholder="Share your thoughts or personal experience..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="accessible-button bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto min-h-[56px]"
              >
                <Send className="h-5 w-5" />
                <span>Sign the Petition</span>
              </button>
              <p className="text-base text-gray-600 mt-6 leading-relaxed">
                By signing, you agree to receive updates about fathers' rights advocacy. 
                You can unsubscribe at any time.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};