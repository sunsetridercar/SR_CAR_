import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "@/tina/__generated__/types";
import { Hero } from "./hero";
import { Services } from "./services";
import { Collection } from "./collection";
import { Story } from "./story";
import { Gallery } from "./gallery";
import { Testimonials } from "./testimonial";
import { Faq } from "./faq";
import { Instagram } from "./instagram";
import { CallToAction } from "./call-to-action";
import { Contact } from "./contact";

type BlocksProps = Omit<Page, "id" | "_sys" | "_values"> & { lang: string };

export const Blocks = ({ lang, ...props }: BlocksProps) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        if (!block) return null;
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block block={block} lang={lang} />
          </div>
        );
      })}
    </>
  );
};

const Block = ({ block, lang }: { block: PageBlocks; lang: string }) => {
  switch (block.__typename) {
    case "PageBlocksHero":
      return <Hero data={block} lang={lang} />;
    case "PageBlocksServices":
      return <Services data={block} lang={lang} />;
    case "PageBlocksCollection":
      return <Collection data={block} />;
    case "PageBlocksStory":
      return <Story data={block} />;
    case "PageBlocksGallery":
      return <Gallery data={block} />;
    case "PageBlocksTestimonials":
      return <Testimonials data={block} />;
    case "PageBlocksFaq":
      return <Faq data={block} />;
    case "PageBlocksInstagram":
      return <Instagram data={block} lang={lang} />;
    case "PageBlocksCta":
      return <CallToAction data={block} lang={lang} />;
    case "PageBlocksContact":
      return <Contact data={block} lang={lang} />;
    default:
      return null;
  }
};
