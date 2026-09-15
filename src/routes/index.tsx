import DesktopIcon from '@/components/desktop/DesktopIcon';
import { SOCIALS } from '@/utils/constants';
import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<div
    id="desktop_icons"
    className={clsx(
      "relative",
      "w-full h-full",
      "py-2 px-4",
      "flex flex-col flex-wrap gap-16",
    )}
  >
    {SOCIALS.map((social) => (
      <DesktopIcon key={social.name} {...{ social }} />
    ))}
  </div>);
}
