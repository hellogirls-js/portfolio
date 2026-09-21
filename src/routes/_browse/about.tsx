import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { Marquee } from "@/components/Marquee";

export const Route = createFileRoute("/_browse/about")({
	component: About,
});

function About() {
	return (
		<div
			className={clsx(
				"page-container",
				"box-border",
				"w-full h-full max-h-full",
				"overflow-y-auto",
				"overflow-x-hidden",
			)}
		>
			<div
				id="about-page"
				className={clsx(
					"relative",
					"overflow-y-auto",
					"size-full",
					"bg-linear-to-b from-secondary-200 to-secondary-300 bg-fixed",
					"font-website",
				)}
			>
				<div
					className={clsx(
						"fixed",
						"z-4",
						"pointer-events-none",
						"size-full",
						"bg-[url('https://assets.hellogirls.info/portfolio/assets/texture.webp')]",
						"bg-fixed bg-repeat",
						"opacity-15",
						"mix-blend-multiply",
					)}
				></div>
				<div
					id="about-page-container"
					className={clsx(
						"relative",
						"z-6",
						"w-3xl min-h-full",
						"m-auto",
						"bg-base-50",
						"border-x border-dashed border-secondary-700",
					)}
				>
					<div
						id="about-page-header"
						className={clsx(
							"relative",
							"w-full h-65",
							"bg-[url('https://assets.hellogirls.info/portfolio/assets/header3.webp')] bg-cover bg-bottom",
							"flex items-center justify-center",
						)}
					>
						<h1
							className={clsx(
								"text-5xl",
								"text-base-50",
								"p-2",
								"text-center",
								"text-shadow-lg",
								"font-bold",
							)}
						>
							About me!!
						</h1>
					</div>
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
								"alphys.png",
								"bunnie.png",
								"mymelo.png",
								"parappa.png",
								"snufkin.png",
								"homestuck.gif",
								"goredoq-bonzi-buddy-stamp.gif",
								"blinkblink.gif",
							].map((file) => (
								<img
									alt={file}
									key={file}
									src={`https://assets.hellogirls.info/portfolio/stamps/${file}`}
									className="inline"
								/>
							))}
							<br />
							{[
								"forumlurker.gif",
								"neversleep.webp",
								"got_love.gif",
								"online_friends.gif",
								"JCqeEwu.gif",
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
							<ul className="list-disc ml-4">
								<li>
									<strong>pokemon!!!!!!</strong>
								</li>
								<li>cats</li>
								<li>animal crossing</li>
								<li>ensemble stars</li>
								<li>shoujo manga</li>
								<li>hyperpop music</li>
								<li>making websites</li>
							</ul>
						</p>
						<h2 className="text-primary-600 mt-4 mb-2 text-2xl font-website">
							Things I HATE!!!
						</h2>
						<p>
							<ul className="list-disc ml-4">
								<li>
									<strong>ONIONS!!!!!!!!!!!</strong>
								</li>
							</ul>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
