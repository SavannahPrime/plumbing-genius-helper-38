
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Code, Link, MessageSquare, Shield, Sparkles, Workflow } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold">connect.software</span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-blue-400 transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            Documentation
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
        </div>
        <Button variant="ghost" className="md:hidden">
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center px-3 py-1 border border-blue-500 rounded-full text-sm text-blue-400">
            <Sparkles className="w-4 h-4 mr-2" />
            Introducing connect.software - The AI-Agent Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Connect Your Software with Intelligent AI Agents
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Build powerful connections between your applications and AI agents. Automate workflows, enhance user experiences, and unlock new possibilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              Get Started Free
            </Button>
            <Button variant="outline" className="border-gray-600 text-lg px-8 py-6">
              View Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
        
        {/* Abstract graphic/mockup */}
        <div className="mt-16 relative w-full max-w-4xl">
          <div className="bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-xl p-1">
            <div className="bg-black/80 rounded-lg p-8 backdrop-blur">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-4">
                  <div className="h-16 bg-gray-800 rounded flex items-center justify-center">
                    <Bot className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="h-32 bg-gray-800 rounded p-4">
                    <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="col-span-2 h-full bg-gray-800 rounded p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Link className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <div className="h-4 w-32 bg-gray-700 rounded"></div>
                      <div className="h-3 w-20 bg-gray-700/50 rounded mt-1"></div>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-gray-700 rounded mb-3"></div>
                  <div className="h-3 w-5/6 bg-gray-700 rounded mb-3"></div>
                  <div className="h-3 w-4/6 bg-gray-700 rounded mb-3"></div>
                  <div className="h-10 w-1/3 bg-blue-600 rounded mt-6"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-8 -left-8 h-16 w-16 bg-blue-500/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -right-8 h-16 w-16 bg-purple-500/30 rounded-full blur-xl"></div>
        </div>
        
        {/* Trusted by */}
        <div className="mt-20">
          <p className="text-gray-400 mb-6">Trusted by innovative companies</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {['Microsoft', 'Google', 'Amazon', 'Slack', 'Salesforce'].map((company) => (
              <div key={company} className="text-lg font-semibold text-gray-400">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect. Integrate. Automate.</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform makes it easy to connect your software with AI agents, unlocking powerful new capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Bot className="h-8 w-8 text-blue-500" />,
              title: "AI Agent Integration",
              description: "Seamlessly connect your software with intelligent AI agents that can understand context, make decisions, and take actions."
            },
            {
              icon: <Workflow className="h-8 w-8 text-green-500" />,
              title: "Automated Workflows",
              description: "Create sophisticated workflows between your applications and AI agents to automate complex business processes."
            },
            {
              icon: <Code className="h-8 w-8 text-purple-500" />,
              title: "Developer-Friendly APIs",
              description: "Our robust APIs and SDKs make it easy to integrate AI capabilities into your existing applications."
            },
            {
              icon: <MessageSquare className="h-8 w-8 text-yellow-500" />,
              title: "Natural Language Processing",
              description: "Enable your applications to understand and respond to natural language queries with advanced NLP capabilities."
            },
            {
              icon: <Shield className="h-8 w-8 text-red-500" />,
              title: "Secure Connections",
              description: "Enterprise-grade security ensures that all connections between your software and AI agents are protected."
            },
            {
              icon: <Sparkles className="h-8 w-8 text-pink-500" />,
              title: "Smart Automation",
              description: "Leverage machine learning to create intelligent automations that improve over time."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
              <div className="bg-slate-700/50 p-3 rounded-lg w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How connect.software Works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get up and running with AI agent integration in just a few simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Select Your Agents",
              description: "Choose from our marketplace of pre-built AI agents or connect your custom agents through our open platform."
            },
            {
              step: "02",
              title: "Connect Your Software",
              description: "Use our simple integration tools to connect your applications to the AI agents of your choice."
            },
            {
              step: "03",
              title: "Deploy & Scale",
              description: "Deploy your connected systems to production and scale seamlessly as your needs grow."
            },
          ].map((step, index) => (
            <div key={index} className="relative">
              <div className="text-5xl font-bold text-blue-500/20 absolute -top-6 left-0">{step.step}</div>
              <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 relative z-10">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-20">
                  <ArrowRight className="h-8 w-8 text-blue-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
            Start Building Today
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your needs, from startups to enterprise organizations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Starter",
              price: "$49",
              description: "Perfect for small teams and startups",
              features: [
                "5 AI Agent Connections",
                "100,000 API Calls/month",
                "Standard Support",
                "Core Integrations",
              ],
              cta: "Get Started",
              highlighted: false,
            },
            {
              title: "Professional",
              price: "$149",
              description: "Ideal for growing businesses",
              features: [
                "25 AI Agent Connections",
                "1,000,000 API Calls/month",
                "Priority Support",
                "Advanced Integrations",
                "Custom Workflows",
              ],
              cta: "Get Started",
              highlighted: true,
            },
            {
              title: "Enterprise",
              price: "Custom",
              description: "For organizations with advanced needs",
              features: [
                "Unlimited AI Agent Connections",
                "Custom API Call Volume",
                "24/7 Dedicated Support",
                "Enterprise Integrations",
                "Advanced Security",
                "Custom Development",
              ],
              cta: "Contact Sales",
              highlighted: false,
            },
          ].map((plan, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-xl border ${
                plan.highlighted 
                  ? "border-blue-500 bg-blue-500/10 relative" 
                  : "border-slate-700/50 bg-slate-800/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-gray-400 ml-1">/month</span>}
              </div>
              <p className="text-gray-300 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.highlighted 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your software with AI?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Connect your applications with intelligent AI agents and unlock new possibilities today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Get Started Free
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">AI Agents</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Examples</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Link className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold">connect.software</span>
            </div>
            <div className="text-gray-400">
              © {new Date().getFullYear()} connect.software. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
