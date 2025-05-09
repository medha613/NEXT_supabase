import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const Home = async () => {

  const cookieStore = await cookies();  

  // Sign in with the provided credentials
// COOKIE STORE can be used only in the server components
  const supabase = createClient(cookieStore);
  const RES = await supabase.auth.signInWithPassword({
    email: "test@mailinator.com",
    password: "test1@123",
  });


  // Now create the Supabase client with the updated cookies

  const { data: { session }, error } = await supabase.auth.getSession();

  console.log(RES, "RESSPONSEEE");  // Log the sign-in response
  console.log(session, "SESSIONNN");  // Log the session (should not be null if successful)

  if (error) {
    console.error("Session error:", error.message);
  } else {
    console.log("User session:", session);
  }
  return (
    <main>
      <Hero />
      <Categories />
      <NewArrival />
      <PromoBanner />
      <BestSeller />
      <CounDown />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
