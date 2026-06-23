import { useState } from 'react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            FAQ & Informasi
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Pertanyaan Yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-xs md:text-sm">
            Semua yang perlu Anda ketahui tentang penyewaan armada minibus Hiace dan mobil lepas kunci di Padang, Sumatera Barat.
          </p>
        </div>

        {/* FAQ list with individual accordion cards */}
        <div className="space-y-4" id="faq-accordion">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className={`bg-white rounded-2xl border transition-all duration-250 ${
                  isOpen ? 'border-orange-200 shadow-md' : 'border-slate-200 shadow-sm'
                }`}
              >
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                  id={`faq-trigger-${index}`}
                >
                  <div className="flex gap-3.5 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isOpen ? 'text-orange-500' : 'text-slate-400'}`} />
                    <span className="text-sm md:text-base font-bold text-slate-800 tracking-tight leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-orange-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div 
                    id={`faq-content-${index}`}
                    className="px-5 md:px-6 pb-6 pt-1 text-slate-700 text-xs md:text-sm border-t border-slate-100 leading-relaxed whitespace-pre-line text-left font-normal"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Helper CTA */}
        <div className="mt-12 text-center bg-white border border-slate-200 p-6 rounded-3xl max-w-xl mx-auto shadow-sm">
          <p className="text-xs text-slate-600 leading-relaxed">
            Punya pertanyaan khusus yang belum terjawab di atas? Tim customer concern kami siap membantu kebutuhan spesifik Anda 24 jam penuh.
          </p>
          <a
            href="https://wa.me/6281374024347?text=Halo%2520Sewa%2520Hiace%2520Padang%252C%2520saya%2520ada%2520beberapa%2520pertanyaan%2520tentang%2520mekanisme%2520sewa%2520mobil."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-5  py-2.5 rounded-full hover:bg-emerald-100 transition-all hover:scale-105 active:scale-95 duration-200"
            id="faq-help-wa-btn"
          >
            Tanya Admin via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
