import {
  FaEnvelope,
  FaFacebookF,
  FaFax,
  FaGithub,
  FaGoogle,
  FaHome,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaTwitter,
} from 'react-icons/fa'
import Image from 'next/image'
import logo from '../assets/ivy.png'

const style = {
  logoText: ` ml-[0.8rem] font-semibold text-2xl tracking-tight text-[#ffffff]`,
  img: `fill-current h-8 w-8 mr-2`,
}

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#fafaf9] text-center text-[#000000] lg:text-left">
        <div className="flex items-center justify-center border-b border-gray-300 p-6 lg:justify-between">
          <div className="mr-12 hidden lg:block">
            <span>Connect with us on social networks:</span>
          </div>
          <div className="flex justify-center">
            <a href="#" className="mr-6 text-[#000000]">
              <FaFacebookF title="facebook" className="w-2.5" />
            </a>
            <a href="#" className="mr-6 text-[#000000]">
              <FaTwitter title="twitter" className="w-4" />
            </a>
            <a href="#" className="mr-6 text-[#000000]">
              <FaGoogle title="google" className="w-3.5" />
            </a>
            <a href="#" className="mr-6 text-[#000000]">
              <FaInstagram title="instagram" className="w-3.5" />
            </a>
            <a href="#" className="mr-6 text-[#000000]">
              <FaLinkedinIn title="linkedin" className="w-3.5" />
            </a>
            <a href="#" className="text-[#000000]">
              <FaGithub title="github" className="w-4" />
            </a>
          </div>
        </div>
        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="">
              <h1 className="mb-4 flex items-center justify-center text-2xl font-black font-semibold uppercase md:justify-start">
                <div className="mr-6 flex flex-shrink-0 items-center text-white">
                  <Image
                    className={style.img}
                    src={logo}
                    height={200}
                    width={400}
                  />
                </div>
              </h1>
            </div>
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase text-[#00ff00] md:justify-start">
                ABOUT
              </h6>
              <p className="mb-4">
                <a href="#" className="text-[#000000]">
                  Community
                </a>
              </p>
              <p className="mb-4">
                <a href="#" className="text-white-200">
                  Token
                </a>
              </p>
              <p className="mb-4">
                <a href="#" className="text-white-200">
                  Documentation
                </a>
              </p>
              <p className="mb-4">
                <a href="#" className="text-white-200">
                  FAQ
                </a>
              </p>
            </div>

            <div className="">
              <a className="mb-4 flex justify-center font-semibold uppercase text-[#00ff00] md:justify-start">
                HELP
              </a>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                {/* <img
                  src="/icons/fas-home.svg"
                  alt="address"
                  className="mr-4 w-4 opacity-70"
                /> */}
                <FaHome title="address" className="mr-4 w-4" /> IN
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaEnvelope title="e-mail" className="mr-4 w-4" />{' '}
                test@something.com
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaPhone title="phone" className="mr-4 w-4" /> +91 963 5021 539
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <FaFax title="fax" className=" mr-4 w-4" /> +91 963 5021 539
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#040f13] p-6 text-center">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-xl text-transparent">
            © 2022 Copyright:{' '}
          </span>
          <a className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-xl text-transparent">
            A Product From Tatz from India
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Footer
