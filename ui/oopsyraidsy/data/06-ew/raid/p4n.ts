import NetRegexes from '../../../../../resources/netregexes';
import ZoneId from '../../../../../resources/zone_id';
import { OopsyData } from '../../../../../types/data';
import { OopsyTriggerSet } from '../../../../../types/oopsy';

// TODO: three stacks of Thrice-come Ruin (9E2) from orbs
//       should this give Doom? it appears maybe it's just instant death?
// TODO: not having your orb popped?

export type Data = OopsyData;

const triggerSet: OopsyTriggerSet<Data> = {
  zoneId: ZoneId.AsphodelosTheFourthCircle,
  damageWarn: {
    'P4N Hell Skewer': '6A4F', // targeted line aoe with short telegraph
    'P4N Shifting Strike': '6A4E', // dash to wall and ~170 cleave
  },
  shareWarn: {
    'P4N Acid Mekhane': '6A38', // green Acid Pinax spread
  },
  shareFail: {
    'P4N Elegant Evisceration': '6A50', // circular tankbuster cleave
  },
  soloFail: {
    'P4N Lava Mekhane': '6A39', // red Lava stack
  },
  triggers: [
    {
      id: 'P4N Tower Burst No Tank',
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '6A44' }),
      condition: (data, matches) => data.party.isTank(matches.target),
      mistake: (_data, matches) => {
        return {
          type: 'fail',
          blame: matches.target,
          reportId: matches.targetId,
          text: {
            en: 'Tank Tower',
          },
        };
      },
    },
    {
      id: 'P4N Tower Burst No Healer',
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '6A45' }),
      condition: (data, matches) => data.party.isHealer(matches.target),
      mistake: (_data, matches) => {
        return {
          type: 'fail',
          blame: matches.target,
          reportId: matches.targetId,
          text: {
            en: 'Healer Tower',
          },
        };
      },
    },
    {
      id: 'P4N Tower Burst No DPS',
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '6A46' }),
      condition: (data, matches) => data.party.isDPS(matches.target),
      mistake: (_data, matches) => {
        return {
          type: 'fail',
          blame: matches.target,
          reportId: matches.targetId,
          text: {
            en: 'DPS Tower',
          },
        };
      },
    },
    {
      id: 'P4N Explosive Aether Burst No Tank',
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '6A41' }),
      condition: (data, matches) => data.party.isTank(matches.target),
      mistake: (_data, matches) => {
        return {
          type: 'fail',
          blame: matches.target,
          reportId: matches.targetId,
          text: {
            en: 'Tank Orb',
          },
        };
      },
    },
    {
      id: 'P4N Explosive Aether Burst No Healer',
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '6A42' }),
      condition: (data, matches) => data.party.isTank(matches.target),
      mistake: (_data, matches) => {
        return {
          type: 'fail',
          blame: matches.target,
          reportId: matches.targetId,
          text: {
            en: 'Healer Orb',
          },
        };
      },
    },
    {
      id: 'P4N Explosive Aether Burst No DPS',
      type: 'Ability',
      netRegex: NetRegexes.ability({ id: '6A43' }),
      condition: (data, matches) => data.party.isTank(matches.target),
      mistake: (_data, matches) => {
        return {
          type: 'fail',
          blame: matches.target,
          reportId: matches.targetId,
          text: {
            en: 'DPS Orb',
          },
        };
      },
    },
    {
      id: 'P4N Knockback',
      type: 'Ability',
      // 6A3A = Well Mekhane
      // 6DAE = Northerly Shift (knockback)
      // 6DAF = Southerly Shift (knockback)
      // 6DB0 = Easterly Shift (knockback)
      // 6DB1 = Westerly Shift (knockback)
      netRegex: NetRegexes.ability({ id: ['6A3A', '6DAE', '6DAF', '6DB0', '6DB1'] }),
      deathReason: (_data, matches) => {
        return {
          id: matches.targetId,
          name: matches.target,
          text: {
            en: 'Pushed into wall',
            de: 'Rückstoß in die Wand',
            ja: '壁へノックバック',
            cn: '击退至墙',
            ko: '넉백',
          },
        };
      },
    },
  ],
};

export default triggerSet;
