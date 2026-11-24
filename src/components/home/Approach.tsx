import Image from "next/image";
import { images } from "@/data/images";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Eyebrow";

const principles = [
  {
    number: "01",
    title: "Porozumenie",
    text: "Najprv sa rozprávame o vašich predstavách, potrebách a o tom, čo si chcete zachovať.",
  },
  {
    number: "02",
    title: "Prirodzenosť",
    text: "Volíme postupy, ktoré rešpektujú vaše jedinečné črty a prirodzený výraz.",
  },
  {
    number: "03",
    title: "Kvalita pokožky",
    text: "Zameriavame sa na zdravý, svieži vzhľad pokožky a dlhodobú starostlivosť o ňu.",
  },
];

export function Approach() {
  return (
    <section id="pristup" aria-labelledby="pristup-title" className="section-y bg-peach-soft">
      <div className="container-site grid items-center gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="relative isolate lg:col-span-5">
          <Parallax className="aspect-[4/5] rounded-[20px] bg-surface sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[600px]">
            <Image
              src={images.manBeard.src}
              alt={images.manBeard.alt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              style={{ objectPosition: images.manBeard.position }}
              className="object-cover"
            />
          </Parallax>
          <div
            aria-hidden
            className="absolute -right-3 -bottom-3 -z-10 hidden size-40 rounded-[20px] bg-peach/50 lg:block"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow>Náš prístup</Eyebrow>
          </Reveal>
          <SplitText as="h2" id="pristup-title" className="type-h2 mt-4">
            Každá pokožka si zaslúži <strong className="font-medium">individuálny prístup.</strong>
          </SplitText>
          <Reveal>
            <p className="mt-5 max-w-[540px] text-lead text-muted">
              Veríme, že kvalitná estetická starostlivosť vychádza z porozumenia vašim potrebám. Pri výbere ošetrenia
              kladieme dôraz na prirodzenosť, kvalitu pokožky a rešpektovanie vašich jedinečných čŕt.
            </p>
          </Reveal>

          <Reveal as="ol" mode="items" className="mt-9 border-t border-line">
            {principles.map((p) => (
              <li
                key={p.number}
                data-reveal-item
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-5 sm:grid-cols-[3rem_11rem_1fr] sm:gap-x-6"
              >
                <span className="text-[13px] font-medium text-primary tabular-nums">{p.number}</span>
                <h3 className="text-[1.0625rem] font-medium">{p.title}</h3>
                <p className="col-start-2 mt-1 text-small text-muted sm:col-start-3 sm:mt-0">{p.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
