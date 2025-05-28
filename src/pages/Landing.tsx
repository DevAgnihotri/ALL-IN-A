import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
	Heart, 
	Star, 
	Brain, 
	Calendar, 
	TrendingUp, 
	Users, 
	Award, 
	Clock,
	Shield,
	ArrowRight,
	CheckCircle,
	Zap,
	type LucideIcon
} from "lucide-react";

// Enhanced features with icons and gradients
const features = [
	{
		title: "Personalized Treatment",
		desc: "Comprehensive assessment tools and AI-powered recommendations to create individualized treatment plans tailored to your specific needs.",
		icon: Brain,
		gradient: "from-green-500 to-emerald-600",
	},
	{
		title: "Licensed Therapists",
		desc: "Connect with board-certified mental health professionals who specialize in evidence-based therapeutic approaches.",
		icon: Calendar,
		gradient: "from-blue-500 to-cyan-600",
	},
	{
		title: "Progress Tracking",
		desc: "Monitor your mental health journey with clinical-grade assessment tools and detailed progress analytics.",
		icon: TrendingUp,
		gradient: "from-purple-500 to-pink-600",
	},
];

// Stats for awesome impact
const stats = [
	{ icon: Users, label: "Happy Users", value: "10K+", color: "text-green-600" },
	{ icon: Award, label: "Expert Therapists", value: "500+", color: "text-blue-600" },
	{ icon: Star, label: "Success Rate", value: "98%", color: "text-purple-600" },
	{ icon: Clock, label: "24/7 Support", value: "Always", color: "text-pink-600" },
];

// Professional benefits for marquee
const benefits = [
	"EVIDENCE-BASED TREATMENTS",
	"LICENSED PROFESSIONAL THERAPISTS", 
	"PERSONALIZED TREATMENT PLANS",
	"HIPAA COMPLIANT & SECURE",
	"24/7 CRISIS SUPPORT AVAILABLE",
	"FLEXIBLE SCHEDULING OPTIONS",
	"INSURANCE ACCEPTED",
	"PROVEN CLINICAL RESULTS"
];

const testimonials = [	{
		name: "Alexandra P.",
		text: "ALL&nbsp;IN&nbsp;A provided me with evidence-based treatment options and connected me with a licensed therapist who truly understood my needs. The platform's professional approach made all the difference.",
		avatar: "https://randomuser.me/api/portraits/women/32.jpg",
		rating: 5,
		title: "Marketing Executive"
	},
	{
		name: "Dr. Priya S.",
		text: "As a healthcare professional, I appreciate ALL&nbsp;IN&nbsp;A's commitment to clinical excellence and patient privacy. The personalized care plans are comprehensive and effective.",
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		rating: 5,
		title: "Healthcare Administrator"
	},
	{
		name: "Jordan M.",
		text: "The therapeutic support I received through ALL&nbsp;IN&nbsp;A was exceptional. The platform maintains the highest standards of professionalism while remaining accessible and user-friendly.",
		avatar: "https://randomuser.me/api/portraits/men/25.jpg",
		rating: 5,
		title: "Software Engineer"
	},
];

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 100,
		},
	},
};

const floatingVariants = {
	animate: {
		y: [-5, 5, -5],
		transition: {
			duration: 3,
			repeat: Infinity,
			ease: "easeInOut",
		},
	},
};

// Marquee Component with true infinite scroll
const Marquee = ({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) => (
	<div className="overflow-hidden whitespace-nowrap w-full">
		<motion.div
			className="inline-flex w-max"
			animate={{ x: [0, "-50%"] }}
			transition={{
				duration: speed,
				repeat: Infinity,
				ease: "linear",
			}}
		>
			<div className="flex items-center">
				{children}
			</div>
			<div className="flex items-center">
				{children}
			</div>
		</motion.div>
	</div>
);

// Enhanced Animated Landing Page
const Landing = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">			{/* Top Marquee - Modern and Calm */}
			<div className="w-full bg-gradient-to-r from-green-500/90 to-emerald-500/90 py-2 overflow-hidden shadow-sm">
				<Marquee speed={25}>
					<div className="flex items-center text-white text-sm font-thin tracking-tight">
						{benefits.map((benefit, index) => (
							<span key={index} className="whitespace-nowrap px-3">
								{benefit}
							</span>
						))}
					</div>
				</Marquee>
			</div>			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-200/20 to-emerald-300/20 rounded-full blur-xl"
					animate={{ rotate: 360 }}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
				/>
				<motion.div
					className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-cyan-300/20 rounded-full blur-xl"
					animate={{ rotate: -360 }}
					transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
				/>
			</div>{/* Header */}
			<motion.header 
				className="relative z-10 w-full flex justify-between items-center px-8 py-6"
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8 }}
			>				<motion.div 
					className="flex items-center space-x-4"
					variants={floatingVariants}
					animate="animate"
				>					<img 
						src="/logo.png" 
						alt="ALL IN A Logo" 
						className="w-12 h-12 object-contain drop-shadow-sm"
					/>					<div>
						<span className="text-3xl font-light bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent tracking-wide">
							ALL&nbsp;IN&nbsp;A
						</span>
						<p className="text-sm text-gray-600 font-normal tracking-wide">Mental Health Platform</p>
					</div>
				</motion.div>
				
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>					<Link
						to="/login"
						className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-green-700 hover:to-emerald-800 border border-green-500/20"
					>
						Sign In / Sign Up
					</Link>
				</motion.div>
			</motion.header>

			{/* Main Content */}
			<motion.main 
				className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-8"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>				{/* Hero Section */}
				<motion.div className="mb-16" variants={itemVariants}>					<motion.h1 
						className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 bg-clip-text text-transparent"
						animate={{ scale: [1, 1.01, 1] }}
						transition={{ duration: 4, repeat: Infinity }}
					>
						ALL&nbsp;IN&nbsp;A
					</motion.h1>
					<motion.p 
						className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-light"
						variants={itemVariants}
					>
						Professional Mental Health Platform
					</motion.p>
					<motion.p 
						className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
						variants={itemVariants}
					>
						Evidence-based treatment solutions with licensed professionals. 
						Personalized care plans designed for your mental wellness journey.
					</motion.p>
				</motion.div>{/* Features Section */}
				<motion.section className="mb-16 w-full max-w-7xl" variants={itemVariants}>					<motion.h2 
						className="text-4xl font-bold mb-12 text-gray-800"
						animate={{ scale: [1, 1.02, 1] }}
						transition={{ duration: 3, repeat: Infinity }}
					>
						Platform Features
					</motion.h2>
					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								className={`relative bg-gradient-to-br ${feature.gradient} p-1 rounded-2xl shadow-2xl group`}
								variants={itemVariants}
								whileHover={{ 
									scale: 1.05,
									rotate: [0, 1, -1, 0],
									transition: { duration: 0.3 }
								}}
								transition={{ delay: index * 0.2 }}
							>
								<div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 h-full">
									<feature.icon className="w-16 h-16 mx-auto mb-4 text-green-600" />
									<h3 className="font-bold text-xl mb-3 text-gray-800">
										{feature.title}
									</h3>
									<p className="text-gray-600 leading-relaxed">{feature.desc}</p>
									
									{/* Hover sweep effect */}
									<motion.div 
										className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
										initial={{ x: "-100%" }}
										whileHover={{ x: "200%" }}
										transition={{ duration: 0.6 }}
									/>
								</div>
							</motion.div>
						))}
					</div>				</motion.section>				{/* CTA Button */}
				<motion.div
					variants={itemVariants}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="mb-16 z-10 relative"
				>
					<Link
						to="/signup"
						className="inline-block px-12 py-5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-lg text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group border border-green-500/20"
					>
						<span className="relative z-20 flex items-center gap-3">
							Get Started Today
							<ArrowRight className="w-5 h-5" />
						</span>
						<motion.div
							className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
						/>
					</Link>
				</motion.div>				{/* Testimonials */}
				<motion.section className="mb-16 max-w-6xl mx-auto" variants={itemVariants}>
					<motion.h2 
						className="text-4xl font-bold mb-12 text-gray-800"
						animate={{ y: [0, -2, 0] }}
						transition={{ duration: 3, repeat: Infinity }}
					>
						Client Testimonials
					</motion.h2>
					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.name}
								className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 relative overflow-hidden"
								variants={itemVariants}
								whileHover={{ 
									y: -5,
									boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)" 
								}}
								transition={{ delay: index * 0.1 }}
							>
								<img
									src={testimonial.avatar}
									alt={testimonial.name}
									className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-green-200 shadow-sm"
								/>
								
								{/* Star rating */}
								<div className="flex justify-center mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
									))}
								</div>
								
								<p className="italic text-gray-600 mb-4 text-sm leading-relaxed">
									"{testimonial.text}"
								</p>
								<div className="text-center">
									<span className="font-semibold text-gray-800 block">
										{testimonial.name}
									</span>
									<span className="text-xs text-gray-500">
										{testimonial.title}
									</span>
								</div>
							</motion.div>
						))}
					</div>
				</motion.section></motion.main>			{/* Bottom Marquee - Modern and Calm */}
			<div className="w-full bg-gradient-to-r from-emerald-500/90 to-green-500/90 py-2 overflow-hidden shadow-sm">
				<Marquee speed={30}>
					<div className="flex items-center text-white text-sm font-thin tracking-tight">
						{benefits.map((benefit, index) => (
							<span key={index} className="whitespace-nowrap px-3">
								{benefit}
							</span>
						))}
					</div>
				</Marquee>
			</div>			{/* Footer */}
			<motion.footer 
				className="relative z-10 py-12 text-center text-gray-600 bg-white/80 backdrop-blur-sm border-t border-gray-100"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 0.8 }}
			>
				<div className="max-w-6xl mx-auto px-4">					<div className="flex items-center justify-center gap-3 mb-6">
						<img 
							src="/logo.png" 
							alt="ALL IN A Logo" 
							className="w-8 h-8 object-contain"
						/>
						<span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
							ALL&nbsp;IN&nbsp;A
						</span>
					</div>
					<div className="grid md:grid-cols-3 gap-8 mb-8 text-sm">
						<div>
							<h3 className="font-semibold text-gray-800 mb-3">Platform</h3>
							<ul className="space-y-2">
								<li><a href="#" className="hover:text-green-600 transition-colors">How It Works</a></li>
								<li><a href="#" className="hover:text-green-600 transition-colors">Find Therapists</a></li>
								<li><a href="#" className="hover:text-green-600 transition-colors">Treatment Plans</a></li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold text-gray-800 mb-3">Support</h3>
							<ul className="space-y-2">
								<li><a href="#" className="hover:text-green-600 transition-colors">Help Center</a></li>
								<li><a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a></li>
								<li><a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a></li>
							</ul>
						</div>						<div>
							<h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
							<ul className="space-y-2">
								<li>24/7 Crisis Support</li>
								<li>support@allina.com</li>
								<li>1-800-ALL&nbsp;IN&nbsp;A</li>
							</ul>
						</div>
					</div>					<div className="border-t border-gray-200 pt-6">
						<p className="text-sm text-gray-500">
							© {new Date().getFullYear()} ALL&nbsp;IN&nbsp;A Mental Health Platform. All rights reserved.
						</p>
						<p className="text-xs text-gray-400 mt-2">
							Licensed mental health professionals • HIPAA compliant • Evidence-based treatment
						</p>
					</div>
				</div>
			</motion.footer>
		</div>
	);
};

export default Landing;
