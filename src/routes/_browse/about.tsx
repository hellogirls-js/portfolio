import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { Marquee } from "@/components/Marquee";

export const Route = createFileRoute("/_browse/about")({
  component: About,
});

function About() {
  console.log({ Marquee });
  return (
    <div
      className={clsx(
        "page-container",
        "box-border",
        "w-full h-full",
        "overflow-y-auto",
        "overflow-x-hidden",
      )}
    >
      <div
        id="about-page"
        className={clsx(
          "w-full h-full",
          "bg-linear-to-b from-secondary-200 to-secondary-300 bg-fixed",
          "font-website",
        )}
      >
        <div
          id="about-page-container"
          className={clsx(
            "w-3xl min-h-full",
            "m-auto",
            "bg-base-50",
            "border-x border-dashed border-secondary-700",
          )}
        >
          <h1
            className={clsx(
              "text-5xl",
              "text-primary-600",
              "p-2",
              "text-center",
            )}
          >
            About me!!
          </h1>
          <div className="w-full mt-4 bg-primary-600">
            <Marquee speed={50} className="font-serif text-base-50">
              welcome to my website!!!!!!!!!!! have a great day :)
            </Marquee>
          </div>
          <div id="about-content" className="font-serif px-4 py-2">
            <p>
              {[
                "CM150sW.png",
                "Uta4nHJ.gif",
                "caramel.gif",
                "kjXOi91.gif",
                "meta9.jpg",
                "wiggly.png",
              ].map((file) => (
                <img
                  alt={file}
                  key={file}
                  src={`https://assets.hellogirls.info/portfolio/stamps/${file}`}
                  className="inline"
                />
              ))}
              <br />
              (stamps from{" "}
              <a
                href="https://clampshell.neocities.org/stamps"
                className="underline text-primary-500"
                target="_blank"
                rel="noreferrer"
              >
                neocities :3
              </a>
              )
            </p>
            <p className="mt-2">
              hi!! my name is son and i am the webmaster for hellogirls.info. i
              can't share my real name because of internet safety u_u i love
              spending time online!! i love watching cat videos and looking at
              funny memes.
            </p>
            <h2 className="text-primary-600 mt-4 mb-2 text-2xl font-website">
              Things I like
            </h2>
            <p>
              i like pokemon, animal crossing, ensemble stars, and reading
              manga. my favorite music genre is hyperpop
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
