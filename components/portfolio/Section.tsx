"use client";

import { motion } from "framer-motion";

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      className="py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
          {subtitle ? <p className="max-w-2xl text-base text-muted-foreground">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </motion.section>
  );
}
