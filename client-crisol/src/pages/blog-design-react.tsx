import React, { useState } from 'react';
import { BiMenu, BiMoon, BiSearch } from 'react-icons/bi';
import { BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa6';
import { GiSun } from 'react-icons/gi';

const BlogWebsite = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  const categories = [
    { name: 'Technology', icon: '💻', color: 'bg-blue-500' },
    { name: 'Travel', icon: '✈️', color: 'bg-orange-500' },
    { name: 'Sport', icon: '⚽', color: 'bg-green-500' },
    { name: 'Business', icon: '💼', color: 'bg-purple-500' },
    { name: 'Management', icon: '📊', color: 'bg-red-500' },
    { name: 'Trends', icon: '📈', color: 'bg-pink-500' },
    { name: 'Startups', icon: '🚀', color: 'bg-indigo-500' },
    { name: 'News', icon: '📰', color: 'bg-cyan-500' }
  ];

  const articles = [
    {
      id: 1,
      title: 'How Tech Shapes the Future of Work in 2024',
      excerpt: 'In today\'s ever-evolving world, storytelling has become a powerful tool for brands. Revision provides a unique platform for individuals to...',
      author: 'Ethan Caldwell',
      date: 'October 16, 2024',
      image: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
      tags: ['BUSINESS', 'NEWS'],
      category: 'Technology'
    },
    {
      id: 2,
      title: 'The Future of Work: Tech and Remote Tools',
      excerpt: 'Not only 2024 is predicted to be a pivotal year for sports technology and its impact on the industry.',
      author: 'Ethan Caldwell',
      date: 'September 26, 2024',
      image: 'linear-gradient(135deg, #A8C0FF 0%, #E0C3FC 100%)',
      tags: ['SPORT', 'TRAVEL'],
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Remote Work in the Digital Age',
      excerpt: 'Discover the cutting-edge tech gadgets making travel smarter and more convenient in 2024.',
      author: 'Ethan Caldwell',
      date: 'September 27, 2024',
      image: 'linear-gradient(135deg, #FFB6D9 0%, #FFC9E5 100%)',
      tags: ['NEWS', 'TRENDS'],
      category: 'Business'
    },
    {
      id: 4,
      title: 'Business Travel Tools for the Digital Age',
      excerpt: 'Learn how startups are leveraging data to fuel growth and scale in the competitive landscape.',
      author: 'Ethan Caldwell',
      date: 'September 26, 2024',
      image: 'linear-gradient(135deg, #667EEA 0%, #9C7FE8 100%)',
      tags: ['BUSINESS'],
      category: 'Business'
    },
    {
      id: 5,
      title: 'Key Sports Trends for 2024: From AI to Virtual Reality',
      excerpt: 'Dive into the key sports trends like AI and virtual reality set to redefine the sports industry in 2024.',
      author: 'Ethan Caldwell',
      date: 'September 26, 2024',
      image: 'linear-gradient(135deg, #F093B0 0%, #FFBE98 100%)',
      tags: ['SPORT'],
      category: 'Sport'
    },
    {
      id: 6,
      title: 'The Impact of Automation on Business Management Efficiency',
      excerpt: 'Learn how automation is boosting business management efficiency and driving growth in various industries.',
      author: 'Ethan Caldwell',
      date: 'September 26, 2024',
      image: 'linear-gradient(135deg, #89B5F5 0%, #B8C6F5 100%)',
      tags: ['TECHNOLOGY'],
      category: 'Business'
    },
    {
      id: 7,
      title: 'Tech Disrupting the Sports Industry with Innovative Tech',
      excerpt: 'Explore how innovative technology is disrupting and innovating within the sports industry.',
      author: 'Ethan Caldwell',
      date: 'September 16, 2024',
      image: 'linear-gradient(135deg, #A8E063 0%, #56AB2F 100%)',
      tags: ['SPORT'],
      category: 'Sport'
    },
    {
      id: 8,
      title: 'Travel Trends in 2024: Virtual Tours and Immersive Experiences',
      excerpt: 'Explore virtual tours and immersive experiences shaping the future of travel in 2024.',
      author: 'Ethan Caldwell',
      date: 'September 16, 2024',
      image: 'linear-gradient(135deg, #D896FF 0%, #BE6AE5 100%)',
      tags: ['NEWS'],
      category: 'Travel'
    },
    {
      id: 9,
      title: 'Why Data Security is a Priority for Business Management in 2024',
      excerpt: 'Understand why data security is a growing concern for business management in today\'s digital world.',
      author: 'Ethan Caldwell',
      date: 'September 9, 2024',
      image: 'linear-gradient(135deg, #B8E6B8 0%, #8DD6A0 100%)',
      tags: ['TRENDS'],
      category: 'Business'
    },
    {
      id: 10,
      title: 'Startups and AI: How Artificial Intelligence Drives Innovation',
      excerpt: 'See how startups are harnessing the power of AI to foster innovation and navigate industries.',
      author: 'Ethan Caldwell',
      date: 'August 20, 2024',
      image: 'linear-gradient(135deg, #FFB88C 0%, #FF9A76 100%)',
      tags: ['STARTUPS'],
      category: 'Startups'
    }
  ];

  const experiences = [
    { role: 'Product Designer', company: 'Pioneer', years: '2023 — Now' },
    { role: 'Product Designer', company: 'Digital', years: '2020 — 2023' },
    { role: 'UX/UI Designer', company: 'Digital', years: '2017 — 2020' }
  ];

  const tools = [
    { name: 'Figma', desc: 'Collaborate and design interfaces in real-time.' },
    { name: 'Notion', desc: 'Plan, track, and collaborate on projects easily.' },
    { name: 'Photoshop', desc: 'Professional image and graphic editing tool.' },
    { name: 'Illustrator', desc: 'Create stunning vector graphics and illustrations.' }
  ];

  const filteredArticles = activeFilter === 'All' 
    ? articles 
    : articles.filter(article => article.category === activeFilter);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="font-bold text-xl">REVISION</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-indigo-600">Homepages</a>
              <a href="#" className="hover:text-indigo-600">Features</a>
              <a href="#" className="hover:text-indigo-600">About</a>
              <a href="#" className="hover:text-indigo-600">Contacts</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2">
                <BiSearch size={20} />
              </button>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2">
                {darkMode ? <GiSun size={20} /> : <BiMoon size={20} />}
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Buy Now
              </button>
              <button className="md:hidden p-2">
                <BiMenu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Heartfelt <span className="text-indigo-600">Reflections:</span> Stories of Love,<br />
          Loss, and Growth
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
          Revision: Welcome to ultimate source for fresh perspectives! Explore curated content to enlighten, entertain and engage global readers.
        </p>
      </section>

      {/* Categories Filter */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-center text-sm font-semibold text-gray-500 mb-6">EXPLORE TRENDING TOPICS</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveFilter('All')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeFilter === 'All'
                ? 'bg-indigo-600 text-white'
                : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveFilter(cat.name)}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2 ${
                activeFilter === cat.name
                  ? 'bg-indigo-600 text-white'
                  : darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <article key={article.id} className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="h-48" style={{ background: article.image }}></div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-xs font-semibold px-3 py-1 bg-white text-gray-800 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{article.author} on {article.date}</p>
                    <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{article.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800">1</button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">2</button>
              <span>...</span>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">4</button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">5</button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Card */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-sm font-semibold text-gray-500 mb-4">ABOUT</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                <div>
                  <h4 className="font-bold text-lg">Ethan Caldwell</h4>
                  <p className="text-sm text-indigo-600">REFLECTIVE BLOGGER</p>
                </div>
              </div>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Ethan Caldwell shares thoughtful insights and reflections on life, culture, and personal growth. His work explores the intersection of creativity and meaningful human perspectives.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-600 hover:text-indigo-600"><BsTwitter size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-indigo-600"><FaFacebook size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-indigo-600"><BsInstagram size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-indigo-600"><BsLinkedin size={20} /></a>
              </div>
            </div>

            {/* Work Experience */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-sm font-semibold text-gray-500 mb-4">WORK EXPERIENCE</h3>
              {experiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-bold">{exp.role}</h4>
                  <p className="text-sm text-gray-500">{exp.company}</p>
                  <p className="text-sm text-gray-400">{exp.years}</p>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-sm font-semibold text-gray-500 mb-4">TECHNOLOGIES</h3>
              {tools.map((tool, index) => (
                <div key={index} className="mb-4 flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {tool.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold">{tool.name}</h4>
                    <p className="text-sm text-gray-500">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <section className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} py-16`}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Subscribe to our email newsletter to get the latest posts delivered right to your email.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter Your Email"
              className={`flex-1 px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              }`}
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            * No spam, unsubscribe anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                  R
                </div>
                <span className="font-bold text-xl">REVISION</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Welcome to ultimate source for fresh perspectives! Explore curated content to enlighten, entertain and engage global readers.
              </p>
              <div className="flex space-x-3 mt-4">
                <a href="#" className="text-gray-600 hover:text-indigo-600"><FaFacebook size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-indigo-600"><BsTwitter size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-indigo-600"><BsInstagram size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-indigo-600"><BsLinkedin size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">HOMEPAGES</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Classic List</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Classic Grid</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Classic Overlay</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Hero Slider</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">CATEGORIES</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Technology</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Travel</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Sport</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Business</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">PAGES</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Categories</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600">Contacts</a></li>
              </ul>
            </div>
          </div>

          <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-8 text-center text-sm text-gray-500`}>
            © 2024 — Revision. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogWebsite;