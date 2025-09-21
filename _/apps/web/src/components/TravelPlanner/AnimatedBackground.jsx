import { Plane, Car, Bus } from "lucide-react";

export function AnimatedBackground() {
  return (
    <>
      <div className="absolute top-10 w-full pointer-events-none">
        <div className="animate-fly-right">
          <Plane className="text-white/30 w-8 h-8" />
        </div>
      </div>
      <div className="absolute top-20 w-full pointer-events-none">
        <div className="animate-fly-left" style={{ animationDelay: "3s" }}>
          <Plane className="text-white/20 w-6 h-6" />
        </div>
      </div>

      <div className="absolute bottom-10 w-full pointer-events-none">
        <div className="animate-drive-right">
          <Car className="text-white/30 w-8 h-8" />
        </div>
      </div>
      <div className="absolute bottom-20 w-full pointer-events-none">
        <div className="animate-drive-left" style={{ animationDelay: "4s" }}>
          <Bus className="text-white/25 w-10 h-10" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fly-right {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        
        @keyframes fly-left {
          0% { transform: translateX(calc(100vw + 100px)); }
          100% { transform: translateX(-100px); }
        }
        
        @keyframes drive-right {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        
        @keyframes drive-left {
          0% { transform: translateX(calc(100vw + 100px)); }
          100% { transform: translateX(-100px); }
        }
        
        .animate-fly-right {
          animation: fly-right 15s linear infinite;
        }
        
        .animate-fly-left {
          animation: fly-left 12s linear infinite;
        }
        
        .animate-drive-right {
          animation: drive-right 20s linear infinite;
        }
        
        .animate-drive-left {
          animation: drive-left 18s linear infinite;
        }
      `}</style>
    </>
  );
}
