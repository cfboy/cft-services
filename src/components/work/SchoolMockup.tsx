import { useTranslation } from 'react-i18next'

/**
 * Itinerario Escolar is a private, signed-in app with real student data, so
 * there is no screenshot to show. This is a code-built illustration of the
 * one thing it does: turn a pencilled room code into a live answer.
 * Every name and number in it is invented.
 */
export function SchoolMockup() {
  const { t } = useTranslation()
  const m = (k: string) => t(`work.projects.school.mockup.${k}`)

  return (
    <div
      role="img"
      aria-label={m('alt')}
      className="bg-muted/40 grid aspect-16/10 grid-cols-2 gap-px overflow-hidden"
    >
      {/* Before — the printed schedule with the pencil margin note */}
      <div
        aria-hidden="true"
        className="bg-background relative flex flex-col justify-between p-4 sm:p-6"
      >
        <span className="text-muted-foreground font-mono text-[10px] tracking-[0.18em] uppercase">
          {m('before')}
        </span>

        {/* Printed schedule rows */}
        <div className="space-y-1.5 py-3">
          {[
            ['8:00', '10-1', '113'],
            ['8:55', '10-3', '215'],
            ['9:50', '11-2', 'A-06'],
            ['10:45', '10-3', '125'],
          ].map(([time, group, room]) => (
            <div
              key={time}
              className="border-border/80 text-muted-foreground/80 grid grid-cols-3 border-b pb-1 font-mono text-[9px] sm:text-[11px]"
            >
              <span>{time}</span>
              <span>{group}</span>
              <span>{room}</span>
            </div>
          ))}
        </div>

        {/* The pencil note — slate, slightly off-axis, as written */}
        <div className="-rotate-2">
          <p className="text-foreground/70 font-mono text-xs italic sm:text-base">
            R2/A-02/125 (Esp.)
          </p>
          <p className="text-foreground/45 mt-1 font-mono text-[10px] italic line-through sm:text-xs">
            10-3/215
          </p>
          <p className="text-muted-foreground mt-2 text-[10px] sm:text-xs">
            {m('beforeNote')}
          </p>
        </div>
      </div>

      {/* Now — the app's answer */}
      <div
        aria-hidden="true"
        className="bg-card relative flex flex-col justify-between p-4 sm:p-6"
      >
        <div className="flex items-center justify-between">
          <span className="text-cft-mint-ink font-mono text-[10px] tracking-[0.18em] uppercase">
            {m('now')} · 10:52
          </span>
          <span className="bg-cft-mint-ink h-1.5 w-1.5 rounded-full" />
        </div>

        <div>
          <p className="text-muted-foreground text-[10px] sm:text-xs">
            {m('student')} · SIE 04170
          </p>
          <p className="font-display mt-1 text-2xl leading-none font-bold tracking-tight sm:text-4xl">
            {m('room')} 125
          </p>
          <p className="text-muted-foreground mt-2 text-[10px] sm:text-sm">
            {m('subject')} · {m('group')} 10-3 · {m('until')} 11:40
          </p>
        </div>

        <div className="bg-primary text-primary-foreground flex h-7 items-center justify-center rounded-md text-[10px] font-medium sm:h-9 sm:text-xs">
          {m('collect')}
        </div>
      </div>
    </div>
  )
}
