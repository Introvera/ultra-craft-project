"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";
import { Compass, Eye, Heart, Target } from "lucide-react";
import Image from "next/image";

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
              src="/aboutus-page/mission.webp"
              alt="Vision illustration representing Ultracraft's modern interior design approach"
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
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Vision
                  </h2>
                </div>
              </CardHeader>

              <CardBody className="px-0 pt-0 text-sm leading-relaxed text-white/80">
                <p>
                  To become the most preferred brand for exclusive living in Sri Lanka with Global presence.
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
                <h3 className="text-2xl font-semibold text-default-900">
                  Mission
                </h3>
              </CardHeader>
              <CardBody className="pt-0 text-sm leading-relaxed text-default-500">
                <p>
                  Our mission is to transform houses into homes and offices into 
                  inspiring workplaces by crafting spaces that are welcoming, 
                  practical, and full of joy.
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
                <h3 className="text-2xl font-semibold text-default-900">
                  Our Values
                </h3>
              </CardHeader>
              <CardBody className="pt-0 text-sm leading-relaxed text-default-500">
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 border border-default-200 text-default-600 rounded-full text-sm font-medium">
                    Customer first
                  </span>
                  <span className="px-4 py-1.5 border border-default-200 text-default-600 rounded-full text-sm font-medium">
                    Continuous improvement
                  </span>
                  <span className="px-4 py-1.5 border border-default-200 text-default-600 rounded-full text-sm font-medium">
                    Concern for the environment
                  </span>
                </div>
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
                  We stay closely involved from concept to completion,
                  collaborating with clients, artisans, and partners to ensure
                  every detail is intentional. Our commitment is to deliver
                  interiors that look refined, feel grounded, and continue to
                  support the way people live over time.
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
