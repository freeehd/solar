"use client"
import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'




const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <nav className="relative z-30 bg-gray-900 text-white">
    <div className="max-container padding-container py-5">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src="/hilink-logo.svg" alt="logo" width={74} height={29} />
        </Link>

        <ul className="hidden space-x-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.key} className="relative group">
              {link.subMenu ? (
                <div className="relative inline-block text-left group">
                  <button className="regular-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                    {link.label}
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                    <div className="py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                      {link.subMenu.map((subItem) => (
                        <Link
                          key={subItem.key}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  className="regular-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button type="button" variant="default">
            Login
            <Image src="/user.svg" alt="user" width={20} height={20} className="ml-2" />
          </Button>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Image src="/menu.svg" alt="menu" width={32} height={32} />
        </button>
      </div>
    </div>

    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden"
        >
          <ul className="flex flex-col items-center space-y-4 bg-gray-800 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                {link.subMenu ? (
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="regular-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                      {link.label}
                      <ChevronDownIcon className="ml-1 h-4 w-4" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {link.subMenu.map((subItem) => (
                            <Menu.Item key={subItem.key}>
                              {({ active }) => (
                                <Link
                                  href={subItem.href}
                                  className={`${
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                  } block px-4 py-2 text-sm`}
                                >
                                  {subItem.label}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    href={link.href}
                    className="regular-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Button type="button" variant="default">
                Login
                <Image src="/user.svg" alt="user" width={20} height={20} className="ml-2" />
              </Button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
  )
}

export default Navbar