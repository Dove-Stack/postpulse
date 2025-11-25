import { ArrowRight, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

export function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-white via-violet-50 to bg-purple-300">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-bold  shadow-purple-800">
          <Sparkles className="w-4 h-4" />
          <span>Now with AI-powered scheduling </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-violet-900 via-purple-600 to-pink-600 px-8 bg-clip-text text-transparent ">
            Schedule Smarter
          </span>
          <br />
          <span className="text-gray-900">Grow Faster</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Manage All your social media in one place. Schedule posts, analyze
          performance and engage with your audience - all powered by AI
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-violet-600 text-white hover:bg-violet-700"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-violet-600 text-white hover:bg-violet-700"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  size="lg"
                  //   className="border-violet-300 text-violet-700 hover:bg-violet-50"
                >
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 border-2 border-white"
                ></div>
              ))}
            </div>
            <span>Trusted by 10,000+ creators</span>
            <div className="flex items-center gap-2">
              {/* <span className="text-yellow-500">★★★★★</span> */}
              {/* <Star fill="yellow" strokeWidth={0} /> */}
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// import { ArrowRight, Sparkles } from "lucide-react";
// import Link from "next/link";
// import { Button } from "../button";

// interface HeroSectionProps {
//   isAuthenticated: boolean;
// }

// export function HeroSection({ isAuthenticated }: HeroSectionProps) {
//   return (
//     // Background remains clean and near-white
//     <section className="pt-32 pb-24 px-4  bg-gradient-to-b from-white via-violet-50 to bg-purple-00 md:bg-gray-50/50">
//       <div className="max-w-6xl mx-auto text-center space-y-10">
//         {/* === Announcement/Pill Badge === */}
//         <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50/50 backdrop-blur-sm rounded-full text-violet-800 text-sm font-semibold border border-violet-200/50 transition duration-300 ease-in-out hover:shadow-lg hover:shadow-violet-200/50">
//           <Sparkles className="w-4 h-4 text-violet-600" />
//           <span>**AI-powered scheduling is here**</span>
//         </div>

//         {/* === Main Headline === */}
//         <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none">
//           <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//             Schedule Smarter
//           </span>
//           <br className="hidden sm:block" />
//           <span className="text-gray-900">Grow Faster.</span>
//         </h1>

//         {/* === Sub-Headline/Description === */}
//         <p className="text-xl md:text-2xl text-gray-500 max-w-4xl mx-auto leading-normal">
//           Manage all your social media in one place. Schedule posts, analyze
//           performance, and engage with your audience — **all powered by AI**.
//         </p>

//         {/* === Action Buttons === */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
//           {isAuthenticated ? (
//             <Link href="/dashboard" passHref>
//               <Button
//                 // size="xl"
//                 className="bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/50 transition transform hover:scale-[1.02] p-8"
//               >
//                 Go to Dashboard
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Button>
//             </Link>
//           ) : (
//             <>
//               <Link href="/sign-up" passHref>
//                 <Button
//                   // size="xl"
//                   className="bg-violet-600 text-white hover:bg-violet-700 shadow-xl shadow-violet-500/50 transition transform hover:scale-[1.02] p-7"
//                 >
//                   Start Free Trial
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </Button>
//               </Link>
//               <Link href="/sign-in" passHref>
//                 <Button
//                   variant="outline"
//                   // size="xl"
//                   className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition p-7"
//                 >
//                   Sign in
//                 </Button>
//               </Link>
//             </>
//           )}
//         </div>

//         {/* 🚀 === PRODUCT MOCKUP PLACEHOLDER === 🚀 */}
//         <div className="pt-20 pb-12">
//           {/* Mockup Container: Uses a large shadow and a border to simulate a modern application window */}
//           <div className="relative w-full max-w-6xl mx-auto h-auto rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-2xl shadow-violet-300/50 transform translate-y-4 perspective-1000">
//             {/* Inner frame/screen area (This is where the actual image will go) */}
//             <div className="w-full h-96 md:h-[500px] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
//               {/* Placeholder text for clarity */}
//               <span className="text-2xl font-bold text-gray-500">
//                 [Product Dashboard Screenshot Placeholder]
//               </span>
//               {/* When ready, replace the <span> element above with your image component:
//                   <Image 
//                     src="/images/dashboard-mockup.png" 
//                     alt="Product Dashboard Screenshot" 
//                     layout="fill" 
//                     objectFit="cover"
//                     className="rounded-lg" 
//                   /> 
//                 */}
//             </div>
//           </div>
//         </div>

//         {/* === Social Proof/Testimonial Bar === */}
//         <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
//           <div className="flex items-center gap-4">
//             {/* Avatar Stack */}
//             <div className="flex -space-x-3">
//               {[1, 2, 3, 4].map((i) => (
//                 <div
//                   key={i}
//                   className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white ring-2 ring-gray-100 shadow-md"
//                 ></div>
//               ))}
//             </div>

//             <span>Trusted by **10,000+ creators**</span>
//             <span className="h-6 w-px bg-gray-200 hidden sm:block"></span>

//             <div className="flex items-center gap-1.5">
//               <span className="text-yellow-500 text-xl">★★★★★</span>
//               <span className="font-semibold text-gray-700">4.9/5 rating</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }