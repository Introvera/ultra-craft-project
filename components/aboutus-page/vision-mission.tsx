"use client";

import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { Eye, Target, Heart, Compass } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const VisionMission = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-0">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        {/* Vision (left) */}
        <motion.div
  className="h-full"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.2 }}
>
  <Card className="relative h-full overflow-hidden border-none bg-black text-white shadow-medium rounded-3xl">
    <Image
      src="/aboutus-page/mission.png"
      alt="Modern interior living room"
      fill
      priority
      className="object-cover"
    />

    <div className="relative z-10 flex h-full flex-col justify-between px-2 lg:px-5">
      <CardHeader className="px-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full">
            <Eye className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Vision</h2>
        </div>
      </CardHeader>

      <CardBody className="px-0 pt-0 text-sm leading-relaxed text-white/80">
        <p>
          To become a trusted interior design partner recognized for meaningful
          spaces, honest materials, and a human-centered approach that elevates
          modern living across homes, apartments, and workspaces.
        </p>
      </CardBody>
    </div>
  </Card>
</motion.div>

        {/* Right column (Mission / Values / Commitment) */}
        <div className="gap-4 flex flex-col">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="rounded-3xl border border-default-100 bg-content1 shadow-sm">
              <CardHeader className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  <Target className="h-7 w-7 text-default-700" />
                </div>
                <h3 className="text-2xl font-semibold text-default-900">Mission</h3>
              </CardHeader>
              <CardBody className="pt-0 text-sm leading-relaxed text-default-500">
                <p>
                  To design and build interiors that enhance everyday living through
                  intention, craftsmanship, and thoughtful simplicity. We aim to
                  create spaces that feel warm, purposeful, and deeply connected to
                  the people who inhabit them.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="rounded-3xl border border-default-100 bg-content1 shadow-sm">
              <CardHeader className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  <Heart className="h-7 w-7 text-default-700" />
                </div>
                <h3 className="text-2xl font-semibold text-default-900">Values</h3>
              </CardHeader>
              <CardBody className="pt-0 text-sm leading-relaxed text-default-500">
                <p>
                  Honesty, craftsmanship, and intention. We believe in materials that
                  age beautifully, relationships built on trust, and design that
                  respects both people and planet.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          {/* Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="rounded-3xl border border-default-100 bg-content1 shadow-sm sm:col-span-2">
              <CardHeader className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  <Compass className="h-7 w-7 text-default-700" />
                </div>
                <h3 className="text-2xl font-semibold text-default-900">
                  Commitment
                </h3>
              </CardHeader>
              <CardBody className="pt-0 text-sm leading-relaxed text-default-500">
                <p>
                  We stay closely involved from concept to completion, collaborating
                  with clients, artisans, and partners to ensure every detail is
                  intentional. Our commitment is to deliver interiors that look
                  refined, feel grounded, and continue to support the way people live
                  over time.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;