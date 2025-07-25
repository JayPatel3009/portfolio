"use client";
// @flow strict

import { useState, useEffect, useMemo } from 'react';
import { experiences } from '@/utils/data/experience';
import Image from 'next/image';
import { BsPersonWorkspace } from 'react-icons/bs';
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from '../../helper/animation-lottie';
import GlowCard from '../../helper/glow-card';
import { computeDuration } from '@/utils/date-helpers';

function ExperienceCard({ exp }) {
  // Memoize formatted start and static end strings
  const formattedStart = useMemo(
    () => new Date(exp.startDate).toLocaleDateString('default', { month: 'short', year: 'numeric' }),
    [exp.startDate]
  );
  const formattedEndStatic = useMemo(
    () =>
      exp.endDate
        ? new Date(exp.endDate).toLocaleDateString('default', { month: 'short', year: 'numeric' })
        : 'Present',
    [exp.endDate]
  );

  // Compute dynamic duration on client-side only
  const [duration, setDuration] = useState('');
  useEffect(() => {
    setDuration(computeDuration(exp.startDate, exp.endDate));
  }, [exp.startDate, exp.endDate]);

  return (
    <GlowCard key={exp.id} identifier={`experience-${exp.id}`}>  
      <div className="p-3 relative">
        <Image
          src="/blur-23.svg"
          alt="Background blur"
          width={1080}
          height={200}
          className="absolute bottom-0 opacity-80"
        />

        <div className="flex justify-center">
          <p className="text-xs sm:text-sm text-[#16f2b3]">
            {`${formattedStart} - ${formattedEndStatic} (${duration})`}
          </p>
        </div>

        <div className="flex items-center gap-x-8 px-3 py-5">
          <div className="text-violet-500 transition-all duration-300 hover:scale-125">
            <BsPersonWorkspace size={36} />
          </div>

          <div>
            <p className="text-base sm:text-xl mb-2 font-medium uppercase">
              {exp.title}
            </p>
            <p className="text-sm sm:text-base">
              {exp.company}
            </p>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

export default function Experience() {
  return (
    <div
      id="experience"
      className="relative border-t my-12 lg:my-24 border-[#25213b]"
    >
      <Image
        src="/section.svg"
        alt="Section background"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {experiences.map(exp => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
