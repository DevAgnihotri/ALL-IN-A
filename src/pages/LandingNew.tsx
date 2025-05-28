import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
	Heart, 
	Sparkles, 
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
		title: "Personalized Wellness",
		desc: "Take our AI-powered quiz and get recommendations tailored just for you with advanced analytics.",
		icon: Brain,
		gradient: "from-green-400 to-emerald-500",
	},
	{
		title: "Book Expert Therapists",
		desc: "Connect with licensed professionals who truly understand your needs and goals.",
		icon: Calendar,
		gradient: "from-blue-400 to-cyan-500",
	},
	{
		title: "Track Your Progress",
		desc: "Visualize your mental health journey with beautiful, insightful analytics and reports.",
		icon: TrendingUp,
		gradient: "from-purple-400 to-pink-500",
	},
];

// Stats for awesome impact
const stats = [
	{ icon: Users, label: "Happy Users", value: "10K+", color: "text-green-600" },
	{ icon: Award, label: "Expert Therapists", value: "500+", color: "text-blue-600" },
	{ icon: Star, label: "Success Rate", value: "98%", color: "text-purple-600" },
	{ icon: Clock, label: "24/7 Support", value: "Always", color: "text-pink-600" },
];

// Benefits for marquee
const benefits = [
	"🌟 Feel Better Every Day",
	"💚 Expert-Guided Support", 
	"🎯 Personalized Journey",
	"📱 Easy to Use",
	"🔒 100% Confidential",
	"🎉 Join Happy Community",
	"⚡ Instant Access",
	"🌈 Positive Vibes Only"
];

const testimonials = [
	{
		name: "Alex P.",
		text: "ALL&nbsp;IN&nbsp;A helped me find the right therapist and stay on track with my mental health goals! 💚",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		rating: 5,
	},
	{
		name: "Priya S.",
		text: "The personalized recommendations from ALL&nbsp;IN&nbsp;A are spot on. Love the clean interface! ✨",
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		rating: 5,
	},
	{
		name: "Jordan M.",
		text: "Amazing platform! The therapists are incredible and the tools really work. 🎉",
		avatar: "https://randomuser.me/api/portraits/women/25.jpg",
		rating: 5,
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

// Marquee Component
const Marquee = ({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) => (
	<div className="overflow-hidden whitespace-nowrap">
		<motion.div
			className="inline-block"
			animate={{ x: ["0%", "-100%"] }}
			transition={{
				duration: speed,
				repeat: Infinity,
				ease: "linear",
			}}
		>
			{children} {children}
		</motion.div>
	</div>
);

// Sparkle animation component
const SparkleIcon = ({ className }: { className?: string }) => (
	<motion.div
		className={className}
		animate={{
			scale: [1, 1.2, 1],
			rotate: [0, 180, 360],
		}}
		transition={{
			duration: 2,
			repeat: Infinity,
			ease: "easeInOut",
		}}
	>
		<Sparkles className="text-yellow-400" />
	</motion.div>
);

// Enhanced Animated Landing Page
const Landing = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-200/30 to-emerald-300/30 rounded-full"
					animate={{ rotate: 360 }}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
				/>
				<motion.div
					className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-cyan-300/30 rounded-full"
					animate={{ rotate: -360 }}
					transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
				/>
				<SparkleIcon className="absolute top-20 left-1/4" />
				<SparkleIcon className="absolute bottom-20 right-1/4" />
			</div>

			{/* Header */}
			<motion.header 
				className="relative z-10 w-full flex justify-between items-center px-8 py-6"
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
				<motion.div 
					className="flex items-center space-x-3"
					variants={floatingVariants}
					animate="animate"
				>					<img 
						src="/logo.png" 
						alt="ALL IN A Logo" 
						className="w-12 h-12 object-contain drop-shadow-lg"
					/>
					<div>
						<span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent tracking-tight">
							ALL&nbsp;IN&nbsp;A
						</span>
						<p className="text-sm text-gray-600 font-medium">Mental Health Platform</p>
					</div>
				</motion.div>
				
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Link
						to="/login"
						className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-green-600 hover:to-emerald-700"
					>
						Sign In / Sign Up ✨
					</Link>
				</motion.div>
			</motion.header>

			{/* Main Content */}
			<motion.main 
				className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-8"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{/* Hero Section */}
				<motion.div className="mb-16" variants={itemVariants}>					<motion.h1 
						className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-lg"
						animate={{ scale: [1, 1.02, 1] }}
						transition={{ duration: 3, repeat: Infinity }}
					>
						ALL&nbsp;IN&nbsp;A 
						<motion.span
							className="inline-block ml-4"
							animate={{ rotate: [0, 10, -10, 0] }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							💚
						</motion.span>
					</motion.h1>
					<motion.p 
						className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
						variants={itemVariants}
					>
						Your Journey to Wellness Starts Here ✨<br/>
						<span className="text-xl text-green-600 font-semibold">
							Empowering you with personalized tools, expert support, and a caring community
						</span>
					</motion.p>
					
					{/* Sparkles around text */}
					<SparkleIcon className="absolute top-8 left-1/3" />
					<SparkleIcon className="absolute top-16 right-1/3" />
				</motion.div>

				{/* Stats Section */}
				<motion.section 
					className="mb-16 w-full max-w-6xl"
					variants={itemVariants}
				>
					<motion.h2 
						className="text-3xl font-bold mb-8 text-green-700"
						animate={{ y: [0, -5, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
					>
						🎉 Amazing Impact
					</motion.h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 hover:scale-105 transition-transform"
								variants={itemVariants}
								whileHover={{ 
									y: -10,
									boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
								}}
								transition={{ delay: index * 0.1 }}
							>
								<stat.icon className={`w-12 h-12 mx-auto mb-3 ${stat.color}`} />
								<div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
								<div className="text-sm text-gray-600 font-medium">{stat.label}</div>
							</motion.div>
						))}
					</div>
				</motion.section>

				{/* Features Section */}
				<motion.section className="mb-16 w-full max-w-7xl" variants={itemVariants}>
					<motion.h2 
						className="text-4xl font-bold mb-12 text-green-700"
						animate={{ scale: [1, 1.05, 1] }}
						transition={{ duration: 2, repeat: Infinity }}
					>
						🚀 Powerful Features
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
					</div>
				</motion.section>				{/* Marquee Section */}
				<motion.section className="mb-16 w-full bg-green-600 py-6 -mx-4" variants={itemVariants}>
					<div className="text-white text-xl font-bold mb-4">
						🌟 Why Users Love ALL&nbsp;IN&nbsp;A
					</div>
					<Marquee speed={25}>
						<div className="flex space-x-8 text-white text-lg font-semibold">
							{benefits.map((benefit, index) => (
								<span key={index} className="whitespace-nowrap px-4">
									{benefit}
								</span>
							))}
						</div>
					</Marquee>
				</motion.section>

				{/* CTA Button */}
				<motion.div
					variants={itemVariants}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className="mb-16"
				>
					<Link
						to="/signup"
						className="px-12 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
					>
						<span className="relative z-10 flex items-center gap-2">
							Get Started Free 🚀
							<ArrowRight className="w-5 h-5" />
						</span>
						<motion.div
							className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							animate={{
								backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
							}}
							transition={{ duration: 3, repeat: Infinity }}
						/>
					</Link>
				</motion.div>

				{/* Testimonials */}
				<motion.section className="mb-16 max-w-6xl mx-auto" variants={itemVariants}>					<motion.h2 
						className="text-4xl font-bold mb-12 text-green-700"
						animate={{ y: [0, -5, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
					>
						💬 What Our ALL&nbsp;IN&nbsp;A Users Say
					</motion.h2>
					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.name}
								className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-green-100 relative overflow-hidden"
								variants={itemVariants}
								whileHover={{ 
									y: -10,
									boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
								}}
								transition={{ delay: index * 0.1 }}
							>
								{/* Floating hearts */}
								<motion.div
									className="absolute top-2 right-2 text-pink-400"
									animate={{ y: [0, -10, 0] }}
									transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
								>
									💝
								</motion.div>
								
								<img
									src={testimonial.avatar}
									alt={testimonial.name}
									className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-green-300 shadow-lg"
								/>
								
								{/* Star rating */}
								<div className="flex justify-center mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<motion.div
											key={i}
											animate={{ rotate: [0, 360] }}
											transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
										>
											<Star className="w-5 h-5 text-yellow-400 fill-current" />
										</motion.div>
									))}
								</div>
								
								<p className="italic text-gray-700 mb-4 text-lg leading-relaxed">
									"{testimonial.text}"
								</p>
								<span className="font-bold text-green-700 text-lg">
									{testimonial.name}
								</span>
							</motion.div>
						))}
					</div>
				</motion.section>
			</motion.main>

			{/* Footer */}
			<motion.footer 
				className="relative z-10 py-8 text-center text-gray-600 text-sm bg-white/50 backdrop-blur-sm"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 0.8 }}
			>				<div className="flex items-center justify-center gap-2 mb-2">
					<span>© {new Date().getFullYear()} ALL&nbsp;IN&nbsp;A Mental Health Platform</span>
					<motion.span
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 1, repeat: Infinity }}
					>
						💚
					</motion.span>
					<span>All rights reserved</span>
				</div>
				<div className="text-green-600 font-medium">
					Built with love for mental wellness ✨
				</div>
			</motion.footer>
		</div>
	);
};

export default Landing;
