import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";
import { useChatContext } from "@/contexts/ChatProvider";
import ConversationBubble from "@/components/chat/ConversationBubble";
import { useRouter } from "next/router";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function MainLayout({ children }) {
  const { data: session } = useSession();
  const { user } = session || {};
  const { openConversations } = useChatContext();
  const router = useRouter();
  const pathname = router?.pathname;

  return (
    <div>
      {/* <Navbar /> */}
      {/* <main className="mt-[60px]"> */}
      {children}
      {/* </main> */}
      {/* <Footer /> */}
      <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar={true} theme="colored" />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        containerId="top-right"
        toastClassName={() =>
          "!top-[80px] relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer shadow-[1px_1px_5px_rgb(0,0,0,.3)] bg-white"
        }
      />
      {user && openConversations?.length && !pathname?.startsWith("/chat") ? (
        <div
          className={`${
            location?.pathname.startsWith("/customer/chat") ? "hidden" : "block"
          } fixed bottom-5 right-5 z-[100] flex flex-col gap-3 py-4 px-2 bg-white/90 rounded-lg shadow-lg`}
        >
          {openConversations.map((conv) => (
            <ConversationBubble conversation={conv} key={conv.id} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
