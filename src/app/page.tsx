"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  CreditCard,
  Activity,
  Heart,
  User,
  Star,
  ChevronRight,
  Info,
  Sparkles,
} from "lucide-react";

export default function WangarattaMassagePage() {
  const [treatment, setTreatment] = useState("remedial-60");
  const [focusArea, setFocusArea] = useState<string[]>(["lower-back"]);
  const [healthFund, setHealthFund] = useState("bupa");
  const [bookingStep, setBookingStep] = useState<"intake" | "confirmed">("intake");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [patientData, setPatientData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDay: "Tomorrow",
    preferredTime: "Afternoon",
    symptoms: "",
  });

  const toggleFocusArea = (area: string) => {
    if (focusArea.includes(area)) {
      setFocusArea(focusArea.filter((a) => a !== area));
    } else {
      setFocusArea([...focusArea, area]);
    }
  };

  const treatments = [
    {
      id: "remedial-45",
      name: "Targeted Remedial Assessment",
      duration: "45 mins",
      price: "$90",
      typicalRebate: "$45 - $60",
      desc: "Fast relief targeting a single trouble spot (e.g. acute stiff neck or tennis elbow).",
    },
    {
      id: "remedial-60",
      name: "Full Remedial & Deep Tissue Treatment",
      duration: "60 mins",
      price: "$115",
      typicalRebate: "$55 - $80",
      popular: true,
      desc: "Comprehensive postural assessment, trigger point release, and targeted muscle therapy.",
    },
    {
      id: "remedial-90",
      name: "Full Body Restorative & Recovery Session",
      duration: "90 mins",
      price: "$165",
      typicalRebate: "$70 - $100",
      desc: "Deep restoration for whole-body tension, chronic pain syndrome, or intense athletic training.",
    },
    {
      id: "dry-needling",
      name: "Remedial Massage + Clinical Dry Needling",
      duration: "60 mins",
      price: "$125",
      typicalRebate: "$55 - $80",
      desc: "Acupuncture-grade fine filament needles to deactivate stubborn muscular trigger points.",
    },
    {
      id: "pregnancy",
      name: "Specialized Nurturing Pregnancy Massage",
      duration: "60 mins",
      price: "$115",
      typicalRebate: "$55 - $80",
      desc: "Safe side-lying positioning with supportive bolsters to relieve pelvic and lumbar pressure.",
    },
  ];

  const healthFunds = [
    { id: "bupa", name: "Bupa", rebate: "Up to $60 - $75", hicaps: "Instant Electronic Claim" },
    { id: "medibank", name: "Medibank Private", rebate: "Up to $55 - $70", hicaps: "Instant Electronic Claim" },
    { id: "hcf", name: "HCF", rebate: "100% back on first visit (eligible plans)", hicaps: "Instant Electronic Claim" },
    { id: "nib", name: "NIB Health", rebate: "Up to $50 - $65", hicaps: "Instant Electronic Claim" },
    { id: "teachers", name: "Teachers Health", rebate: "Generous extras rebate", hicaps: "Instant Electronic Claim" },
    { id: "police", name: "Police Health / Emergency", rebate: "Top tier coverage", hicaps: "Instant Electronic Claim" },
    { id: "other", name: "All other 45+ Australian Funds", rebate: "Eligible via HICAPS", hicaps: "Swipe card on day" },
  ];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError(null);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: patientData.name,
          phone: patientData.phone,
          email: patientData.email,
          treatment,
          focusAreas: focusArea,
          healthFund,
          preferredDay: patientData.preferredDay,
          preferredTime: patientData.preferredTime,
          symptoms: patientData.symptoms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit appointment booking.");
      }

      setBookingStep("confirmed");
    } catch (err: any) {
      setBookingError(err.message || "Failed to submit booking. Please call us directly.");
    } finally {
      setBookingLoading(false);
    }
  };

  const selectedTreatmentObj = treatments.find((t) => t.id === treatment) || treatments[1];

  return (
    <div className="min-h-screen bg-[#0a1210] text-emerald-50 selection:bg-emerald-600 selection:text-white font-sans">
      {/* Top Banner */}
      <aside aria-label="Clinic Rebates Notice" className="bg-emerald-800/90 text-white px-4 py-2 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border-b border-emerald-700/50">
        <CreditCard className="w-4 h-4 text-emerald-300" />
        <span className="font-bold">INSTANT HICAPS REBATES:</span>
        <span>Claim your private health extras on-the-spot &bull; Pay only the gap</span>
        <a href="#hicaps" className="underline ml-2 hidden sm:inline hover:text-emerald-200">
          Check your fund &rarr;
        </a>
      </aside>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a1210]/90 backdrop-blur-md border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-700/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                WANGARATTA <span className="text-emerald-400">REMEDIAL MASSAGE</span>
              </span>
              <p className="text-xs text-emerald-400/80 font-medium">
                Accredited Allied Health &bull; HICAPS Provider
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-emerald-200/80">
            <a href="#booking" className="hover:text-emerald-300 transition-colors">
              Book Online 24/7
            </a>
            <a href="#services" className="hover:text-emerald-300 transition-colors">
              Treatments
            </a>
            <a href="#hicaps" className="hover:text-emerald-300 transition-colors">
              HICAPS Rebates
            </a>
            <a href="#clinic" className="hover:text-emerald-300 transition-colors">
              Our Clinic
            </a>
            <a href="#reviews" className="hover:text-emerald-300 transition-colors">
              Reviews
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-emerald-950">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left pitch */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Massage &amp; Myotherapy Australia Accredited
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Relieve Chronic Pain. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  Restore Free Movement.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/80 max-w-xl leading-relaxed">
                Whether you’re suffering from lower back stiffness, desk-worker tension headaches, or sports injuries, our qualified Wangaratta remedial therapists provide targeted musculoskeletal relief with instant on-the-spot health fund claiming.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#101e1a] border border-emerald-900/60 p-3.5 rounded-2xl">
                  <div className="text-emerald-400 font-bold text-xl">HICAPS</div>
                  <p className="text-xs text-emerald-300/70 mt-1">Instant On-Site Claim</p>
                </div>
                <div className="bg-[#101e1a] border border-emerald-900/60 p-3.5 rounded-2xl">
                  <div className="text-teal-300 font-bold text-xl">24/7</div>
                  <p className="text-xs text-emerald-300/70 mt-1">Online Self-Booking</p>
                </div>
                <div className="bg-[#101e1a] border border-emerald-900/60 p-3.5 rounded-2xl">
                  <div className="text-amber-300 font-bold text-xl flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" /> 5.0
                  </div>
                  <p className="text-xs text-emerald-300/70 mt-1">Verified Client Care</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#booking"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Select Date &amp; Complete Intake
                </a>
                <a
                  href="#hicaps"
                  className="bg-[#13231f] hover:bg-[#192f29] text-emerald-200 font-semibold px-6 py-3.5 rounded-xl border border-emerald-800/80 transition-all flex items-center gap-2 text-sm"
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  View Rebate Guide
                </a>
              </div>
            </div>

            {/* Right Interactive Booking & Intake Widget */}
            <div id="booking" className="lg:col-span-6">
              <div className="bg-[#0f1d19] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                <div className="flex items-center justify-between pb-5 border-b border-emerald-900/60">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                      24/7 Appointment Booking &amp; Intake
                    </h2>
                    <p className="text-xs text-emerald-300/70 mt-0.5">
                      Fast 2-minute booking with zero upfront payment required
                    </p>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full">
                    Live Calendar
                  </span>
                </div>

                {bookingStep === "confirmed" ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Your Session is Reserved!</h3>
                    <p className="text-sm text-emerald-200/90 max-w-sm mx-auto leading-relaxed">
                      Thank you <span className="text-emerald-300 font-semibold">{patientData.name || "there"}</span>. Your {selectedTreatmentObj.name} appointment request has been scheduled for {patientData.preferredDay} ({patientData.preferredTime}).
                    </p>
                    <div className="bg-[#142823] p-4 rounded-xl max-w-sm mx-auto text-xs text-emerald-300/90 space-y-1 text-left">
                      <p className="font-semibold text-white">Remember on the day:</p>
                      <p>&bull; Bring your {healthFund.toUpperCase()} card for instant HICAPS claiming</p>
                      <p>&bull; Wear comfortable clothing</p>
                      <p>&bull; Wangaratta clinic with free off-street parking</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBookingStep("intake")}
                      className="text-xs text-emerald-400 underline pt-2"
                    >
                      Make another appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
                    {/* Treatment Selector */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                        1. Select Treatment &amp; Duration
                      </label>
                      <div className="space-y-2">
                        {treatments.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setTreatment(item.id)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                              treatment === item.id
                                ? "bg-emerald-950/80 border-emerald-400 text-white shadow-md shadow-emerald-950"
                                : "bg-[#13231f] border-emerald-900/60 text-emerald-200/80 hover:border-emerald-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="treatment"
                                checked={treatment === item.id}
                                onChange={() => setTreatment(item.id)}
                                className="accent-emerald-400"
                              />
                              <div>
                                <div className="font-bold text-white flex items-center gap-2">
                                  {item.name}
                                  {item.popular && (
                                    <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                                      Most Popular
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-emerald-400/80">
                                  {item.duration} &bull; Est. Rebate: {item.typicalRebate}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm font-extrabold text-emerald-300">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Target Pain / Focus Areas */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                        2. Primary Areas of Tension or Discomfort
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 text-xs">
                        {[
                          { id: "neck", label: "Neck / Headaches" },
                          { id: "shoulders", label: "Shoulders / Traps" },
                          { id: "upper-back", label: "Upper / Mid Back" },
                          { id: "lower-back", label: "Lower Back / Sciatica" },
                          { id: "hips", label: "Hips & Pelvis" },
                          { id: "legs", label: "Legs & Hamstrings" },
                        ].map((area) => (
                          <button
                            key={area.id}
                            type="button"
                            onClick={() => toggleFocusArea(area.id)}
                            className={`p-2 rounded-lg border text-center transition-all font-medium ${
                              focusArea.includes(area.id)
                                ? "bg-emerald-800/80 border-emerald-400 text-white font-bold"
                                : "bg-[#13231f] border-emerald-900/60 text-emerald-300/80 hover:border-emerald-700"
                            }`}
                          >
                            {area.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Health Fund Selector */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                        3. Health Fund for HICAPS Rebate
                      </label>
                      <select
                        value={healthFund}
                        onChange={(e) => setHealthFund(e.target.value)}
                        className="w-full bg-[#13231f] border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="bupa">Bupa Health Insurance</option>
                        <option value="medibank">Medibank Private</option>
                        <option value="hcf">HCF</option>
                        <option value="nib">NIB Health</option>
                        <option value="teachers">Teachers Health / UniHealth</option>
                        <option value="police">Police Health / Emergency Services</option>
                        <option value="australian-unity">Australian Unity</option>
                        <option value="other">Other Fund / Non-Insured (Direct Pay)</option>
                      </select>
                    </div>

                    {/* Patient Contact & Preferred Time */}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={patientData.name}
                        onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                        className="bg-[#13231f] border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-emerald-600 focus:outline-none focus:border-emerald-400"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number *"
                        value={patientData.phone}
                        onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                        className="bg-[#13231f] border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-emerald-600 focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <input
                      type="email"
                      placeholder="Email Address (optional, for confirmation)"
                      value={patientData.email}
                      onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                      className="w-full bg-[#13231f] border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-emerald-600 focus:outline-none focus:border-emerald-400"
                    />

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <select
                        value={patientData.preferredDay}
                        onChange={(e) => setPatientData({ ...patientData, preferredDay: e.target.value })}
                        className="bg-[#13231f] border border-emerald-800 rounded-lg px-3 py-2 text-white"
                      >
                        <option>Today (Urgent)</option>
                        <option>Tomorrow</option>
                        <option>Later this week</option>
                        <option>Saturday Morning</option>
                      </select>
                      <select
                        value={patientData.preferredTime}
                        onChange={(e) => setPatientData({ ...patientData, preferredTime: e.target.value })}
                        className="bg-[#13231f] border border-emerald-800 rounded-lg px-3 py-2 text-white"
                      >
                        <option>Morning (8am - 12pm)</option>
                        <option>Afternoon (12pm - 4pm)</option>
                        <option>Evening (4pm - 7pm)</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Symptoms or focus notes (optional)"
                      value={patientData.symptoms}
                      onChange={(e) => setPatientData({ ...patientData, symptoms: e.target.value })}
                      className="w-full bg-[#13231f] border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-emerald-600 focus:outline-none focus:border-emerald-400"
                    />

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
                    >
                      {bookingLoading ? "Submitting..." : "CONFIRM APPOINTMENT \u2022 PAY ON THE DAY"}
                    </button>
                    {bookingError && (
                      <p className="text-xs text-red-400 text-center font-medium bg-red-950/40 border border-red-800/60 rounded-lg p-2">
                        {bookingError}
                      </p>
                    )}
                    <p className="text-[11px] text-center text-emerald-400/60">
                      Zero cancellation fees up to 24h prior &bull; Direct confirmation via SMS
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HICAPS Health Fund Rebate Guide */}
      <section id="hicaps" className="py-20 bg-[#0d1714] border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Transparent Health Fund Claiming
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              How Instant HICAPS Rebates Work
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-2">
              We process your private health extras immediately at the clinic terminal. You simply pay the remaining gap amount with EFTPOS or cash.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#101e1a] border border-emerald-900/60 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-white text-base mb-2">Attend Your Treatment</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                Enjoy your personalized remedial, deep tissue, or sports therapy treatment tailored to your pain profile.
              </p>
            </div>

            <div className="bg-[#101e1a] border border-emerald-900/60 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-white text-base mb-2">Swipe Your Member Card</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                Swipe your physical or digital health insurance card on our dedicated HICAPS terminal at the reception desk.
              </p>
            </div>

            <div className="bg-[#101e1a] border border-emerald-900/60 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-white text-base mb-2">Pay Only The Difference</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                Your fund pays their portion directly to us on the spot. No paperwork, no receipt uploads, zero waiting for refunds.
              </p>
            </div>
          </div>

          {/* Fund table */}
          <div className="bg-[#101e1a] border border-emerald-900/60 rounded-2xl p-6 overflow-x-auto">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              Supported Health Insurance Providers at Wangaratta Remedial Massage
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {healthFunds.map((fund) => (
                <div
                  key={fund.id}
                  className="p-3.5 rounded-xl bg-[#142823] border border-emerald-900/60 flex items-center justify-between"
                >
                  <div>
                    <span className="text-sm font-bold text-white block">{fund.name}</span>
                    <span className="text-[11px] text-emerald-300/80">{fund.rebate}</span>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-2 py-1 rounded-md">
                    Instant HICAPS
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Clinical Specializations
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              Evidence-Based Musculoskeletal Therapies
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#101e1a] border border-emerald-900/60 p-6 rounded-2xl">
              <h3 className="font-bold text-white text-lg mb-2">Remedial Musculoskeletal Therapy</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed mb-4">
                Full orthopedic assessment of joint mobility, posture, and muscle imbalance. Combines trigger point therapy, myofascial release, and PNF stretching.
              </p>
              <div className="text-xs font-semibold text-emerald-400">Ideal for: Chronic back &amp; neck pain</div>
            </div>

            <div className="bg-[#101e1a] border border-emerald-900/60 p-6 rounded-2xl">
              <h3 className="font-bold text-white text-lg mb-2">Sports Injury &amp; Athletic Recovery</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed mb-4">
                Tailored pre- and post-event flush, scar tissue breakdown, and rehabilitation for Wangaratta football, netball, running, and cycling athletes.
              </p>
              <div className="text-xs font-semibold text-emerald-400">Ideal for: Tendonitis, calf strains, rotator cuff</div>
            </div>

            <div className="bg-[#101e1a] border border-emerald-900/60 p-6 rounded-2xl">
              <h3 className="font-bold text-white text-lg mb-2">Clinical Dry Needling &amp; Cupping</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed mb-4">
                Precise micro-filament insertion into neuromotor trigger points to release deep tension that manual pressure cannot reach, paired with silicone decompression cupping.
              </p>
              <div className="text-xs font-semibold text-emerald-400">Ideal for: Sciatica, stubborn glute &amp; trap spasms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-[#0d1714] border-t border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Patient Outcomes
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Loved by Wangaratta Locals
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#101e1a] border border-emerald-900/60 p-6 rounded-2xl">
              <div className="flex text-amber-300 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-300" />
                ))}
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed italic mb-4">
                &ldquo;Suffered from severe lower back pain and sciatica for 6 months. After 3 sessions of remedial therapy and dry needling here, I can finally work full days on the farm without painkillers. HICAPS claiming on the spot was seamless.&rdquo;
              </p>
              <div className="text-xs font-bold text-white">Brad M.</div>
              <div className="text-[10px] text-emerald-400">Farmer, Oxley</div>
            </div>

            <div className="bg-[#101e1a] border border-emerald-900/60 p-6 rounded-2xl">
              <div className="flex text-amber-300 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-300" />
                ))}
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed italic mb-4">
                &ldquo;Working at a computer in Wangaratta council gave me chronic tension headaches. Their targeted neck and shoulder treatment resolved the pain completely. Best remedial massage in North East VIC.&rdquo;
              </p>
              <div className="text-xs font-bold text-white">Claire W.</div>
              <div className="text-[10px] text-emerald-400">Wangaratta Local</div>
            </div>

            <div className="bg-[#101e1a] border border-emerald-900/60 p-6 rounded-2xl">
              <div className="flex text-amber-300 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-300" />
                ))}
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed italic mb-4">
                &ldquo;The pregnancy massage here was heaven during my 3rd trimester. Safe positioning with belly cushions, gentle release for my hips and lower back. Highly recommended to all expectant mums.&rdquo;
              </p>
              <div className="text-xs font-bold text-white">Megan P.</div>
              <div className="text-[10px] text-emerald-400">Glenrowan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="clinic" className="bg-[#070c0b] py-16 text-emerald-300/70 text-xs border-t border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div>
            <span className="text-base font-bold text-white block mb-3">
              WANGARATTA REMEDIAL MASSAGE
            </span>
            <p className="leading-relaxed">
              Professional allied health remedial massage, dry needling, and sports therapy in Wangaratta VIC 3677.
            </p>
            <p className="mt-3 text-emerald-400/80">
              Massage &amp; Myotherapy Australia Member Provider
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Direct Contact
            </h4>
            <p className="mb-2">
              Email:{" "}
              <a href="mailto:wangarattamassage@gmail.com" className="text-emerald-400 hover:underline">
                wangarattamassage@gmail.com
              </a>
            </p>
            <p className="mb-2">
              Phone:{" "}
              <a href="tel:0357210000" className="text-emerald-400 hover:underline">
                (03) 5721 0000
              </a>
            </p>
            <p className="text-emerald-500">24/7 Self-Service Online Booking Available</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Clinic Opening Hours
            </h4>
            <ul className="space-y-1.5">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="text-white">8:00 AM – 6:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white">8:30 AM – 2:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-emerald-500">Closed</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Clinic Amenities
            </h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Private, quiet treatment suites
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Heated orthopedic tables
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free on-site clinic parking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant HICAPS EFTPOS terminal
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-emerald-950 text-center text-emerald-500/50">
          &copy; {new Date().getFullYear()} Wangaratta Remedial Massage. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
