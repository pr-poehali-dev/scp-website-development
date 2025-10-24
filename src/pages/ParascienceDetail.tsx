import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ParascienceData {
  id: string;
  name: string;
  icon: string;
  color: string;
  shortDesc: string;
  fullDescription: string;
  principles: string[];
  applications: string[];
  relatedSCPs: Array<{ id: string; name: string; description: string }>;
  incidents: string[];
  researchHubs: Array<{ name: string; description: string }>;
}

const parascienceDatabase: Record<string, ParascienceData> = {
  "antimemetics": {
    id: "antimemetics",
    name: "Антимеметика",
    icon: "EyeOff",
    color: "bg-slate-900/50 border-slate-600",
    shortDesc: "Изучение идей и объектов, которые сопротивляются запоминанию и распространению.",
    fullDescription: "Антимеметика — раздел паранауки, изучающий антимемы: идеи, объекты или сущности, которые активно сопротивляются распространению через человеческую память и коммуникацию. В отличие от обычной информации, антимемы не могут быть запомнены обычными способами. Для работы с антимемами требуются специальные мнемонические препараты класса-W и протоколы постоянного напоминания.",
    principles: [
      "Антимем — это идея с самоцензурирующими свойствами",
      "Антимемы не могут быть переданы через обычные средства коммуникации",
      "Для защиты от антимемов используются мнемонестетики",
      "Антимеметические объекты могут быть невидимы для восприятия",
      "Требуется постоянное документирование и напоминание о существовании антимема"
    ],
    applications: [
      "Разработка мнемонических препаратов класса-W и класса-X",
      "Создание антимеметических протоколов содержания",
      "Исследование невидимых для восприятия объектов",
      "Защита персонала от когнитивных опасностей",
      "Изучение информационных аномалий"
    ],
    relatedSCPs: [
      {
        id: "SCP-055",
        name: "[неизвестно]",
        description: "Самоцензурирующийся объект. Никто не может вспомнить, что это такое, но все помнят, что он существует."
      },
      {
        id: "SCP-3125",
        name: "Беглец",
        description: "Сверхмощная антимеметическая сущность, существующая в ноосфере. Угроза класса K."
      },
      {
        id: "SCP-2256",
        name: "Очень раздражающий SCP",
        description: "Антимеметический объект, заставляющий забывать о своем существовании через несколько минут."
      }
    ],
    incidents: [
      "Инцидент Пятого Закона: Почти полная потеря Антимеметического Отдела из-за SCP-3125.",
      "Операция 'Аверналь': Успешное содержание SCP-055 через создание циклической системы напоминаний.",
      "Протокол Марион Уилер: Разработка мнемонических агентов класса-W для долгосрочной защиты."
    ],
    researchHubs: [
      {
        name: "Антимеметический Отдел",
        description: "Специализированное подразделение, занимающееся исключительно антимемами. Требует регулярного приёма мнемонестетиков."
      },
      {
        name: "Проект 'Забвение'",
        description: "Исследовательская программа по картографированию антимеметического пространства."
      }
    ]
  },
  "thaumatology": {
    id: "thaumatology",
    name: "Тауматология",
    icon: "Sparkles",
    color: "bg-emerald-900/50 border-emerald-600",
    shortDesc: "Наука о магии и аномальных манипуляциях реальностью.",
    fullDescription: "Тауматология — систематическое изучение магии как научной дисциплины. Фонд рассматривает магию не как сверхъестественное явление, а как малоизученную область физики, связанную с манипуляцией реальностью через специфические ритуалы, жесты и артефакты. Тауматология измеряет магическую энергию в единицах Аспект-радиации (АР).",
    principles: [
      "Магия подчиняется измеримым законам физики",
      "Тауматургические эффекты требуют энергетических затрат",
      "Аспект-радиация — основная единица измерения магической энергии",
      "Ритуалы и заклинания — это алгоритмы манипуляции реальностью",
      "Каждое заклинание имеет компоненты: словесные, жестовые, материальные"
    ],
    applications: [
      "Детектирование магических аномалий через детекторы Канта",
      "Создание антитауматургических полей для нейтрализации магии",
      "Разработка защитных рун и барьеров",
      "Исследование магических артефактов и гримуаров",
      "Обучение персонала базовой тауматургической защите"
    ],
    relatedSCPs: [
      {
        id: "SCP-2000",
        name: "Deus Ex Machina",
        description: "Огромный тауматургический комплекс для восстановления человечества после катастроф."
      },
      {
        id: "SCP-3179",
        name: "Алхимический жезл",
        description: "Артефакт Серпентовой Десницы с тауматургическими свойствами трансмутации."
      },
      {
        id: "SCP-4840",
        name: "Исполнитель завета",
        description: "Тауматургический конструкт древней цивилизации с огромной магической силой."
      }
    ],
    incidents: [
      "Инцидент Скарлет Короля: Попытка использования тауматургии для запечатывания межмерной сущности.",
      "Проект 'Барьер': Создание глобальной сети антитауматургических анкоров.",
      "Событие 'Фикс Идеал': Масштабный ритуал по стабилизации локальной реальности."
    ],
    researchHubs: [
      {
        name: "Отдел тауматологических исследований",
        description: "Главное подразделение по изучению магических явлений и артефактов."
      },
      {
        name: "Академия Тауматологии",
        description: "Обучающий центр для персонала с тауматургическим потенциалом."
      }
    ]
  },
  "alchemy": {
    id: "alchemy",
    name: "Алхимия",
    icon: "FlaskConical",
    color: "bg-amber-900/50 border-amber-600",
    shortDesc: "Трансмутация материи через аномальные процессы.",
    fullDescription: "Алхимия в контексте аномальных исследований — это наука о трансмутации материи через паранаучные методы. В отличие от обычной химии, алхимия использует аномальные процессы для изменения базовых свойств вещества, включая создание философского камня, эликсира жизни и трансмутацию элементов.",
    principles: [
      "Трансмутация возможна через нарушение законов сохранения",
      "Философский камень — катализатор совершенной трансмутации",
      "Четыре первоэлемента: огонь, вода, воздух, земля",
      "Принцип соответствия: как вверху, так и внизу",
      "Материя и дух связаны через алхимические процессы"
    ],
    applications: [
      "Создание аномальных материалов и субстанций",
      "Трансмутация токсичных отходов в безопасные вещества",
      "Производство универсальных растворителей",
      "Разработка эликсиров с аномальными свойствами",
      "Исследование бессмертия и регенерации"
    ],
    relatedSCPs: [
      {
        id: "SCP-500",
        name: "Панацея",
        description: "Пилюли, способные излечить любую болезнь. Возможно алхимического происхождения."
      },
      {
        id: "SCP-294",
        name: "Кофейный автомат",
        description: "Устройство, способное создать любую жидкость. Возможна алхимическая трансмутация."
      },
      {
        id: "SCP-914",
        name: "Часовой механизм",
        description: "Машина, способная 'улучшать' материю через неизвестный алхимический процесс."
      }
    ],
    incidents: [
      "Эксперимент Хомункул-12: Попытка создания искусственной жизни алхимическим путем.",
      "Проект Золотая Заря: Исследование возможности массового производства золота.",
      "Инцидент Красный Эликсир: Неудачная попытка синтеза эликсира бессмертия."
    ],
    researchHubs: [
      {
        name: "Лаборатория алхимических исследований",
        description: "Специализированная лаборатория для изучения трансмутации и алхимических процессов."
      },
      {
        name: "Архив Парацельса",
        description: "Хранилище древних алхимических текстов и рецептур."
      }
    ]
  },
  "surrealism": {
    id: "surrealism",
    name: "Сюрреалистика",
    icon: "Shapes",
    color: "bg-purple-900/50 border-purple-600",
    shortDesc: "Исследование нелогичных, парадоксальных явлений и объектов.",
    fullDescription: "Сюрреалистика — изучение объектов и явлений, нарушающих логику, причинно-следственные связи и законы реальности фундаментальным образом. Сюрреалистические аномалии часто невозможно описать обычным языком, так как они существуют вне рамок рационального понимания.",
    principles: [
      "Причина и следствие могут быть инвертированы или отсутствовать",
      "Логические парадоксы могут физически существовать",
      "Реальность может быть нестабильной и меняться непредсказуемо",
      "Сюрреалистические объекты не подчиняются обычным законам физики",
      "Восприятие сюрреалистических аномалий субъективно"
    ],
    applications: [
      "Изучение невозможных геометрий и пространств",
      "Исследование парадоксальных объектов",
      "Анализ нарушений причинно-следственных связей",
      "Разработка методов взаимодействия с нелогичными сущностями",
      "Картографирование сюрреальных измерений"
    ],
    relatedSCPs: [
      {
        id: "SCP-055",
        name: "[данные удалены]",
        description: "Объект, который невозможно описать или запомнить. Сюрреалистическая природа."
      },
      {
        id: "SCP-3999",
        name: "Я существую внутри многих",
        description: "Сюрреалистическая сущность, нарушающая повествовательную структуру реальности."
      },
      {
        id: "SCP-2719",
        name: "Внутри",
        description: "Абстрактный концепт 'внутри', существующий как физический объект."
      }
    ],
    incidents: [
      "Событие Эшера: Обнаружение здания с невозможной архитектурой.",
      "Парадокс Клейна: Существование объекта, являющегося своей собственной емкостью.",
      "Инцидент Дали: Материализация сюрреалистических художественных образов в реальности."
    ],
    researchHubs: [
      {
        name: "Отдел сюрреальных исследований",
        description: "Подразделение, специализирующееся на изучении парадоксальных и нелогичных аномалий."
      },
      {
        name: "Проект 'Невозможное'",
        description: "Исследовательская программа по каталогизации объектов, нарушающих логику."
      }
    ]
  },
  "pataphysics": {
    id: "pataphysics",
    name: "Патафизика",
    icon: "Infinity",
    color: "bg-cyan-900/50 border-cyan-600",
    shortDesc: "Наука об исключениях и воображаемых решениях.",
    fullDescription: "Патафизика — наука, изучающая то, что выходит за пределы метафизики. Она занимается исследованием законов, управляющих исключениями, и описанием вселенной, дополнительной к нашей. В контексте аномальных исследований, патафизика изучает нарративные слои реальности и возможность существования нашей вселенной как вымысла в более высокой реальности.",
    principles: [
      "Реальность может быть вложенной структурой повествований",
      "Возможно существование авторов, создающих нашу реальность",
      "Патафизические аномалии могут изменять 'сюжет' реальности",
      "Наш мир может быть одним из множества нарративных слоев",
      "Исключения из правил являются самостоятельными правилами"
    ],
    applications: [
      "Обнаружение нарративных аномалий и вмешательств",
      "Изучение метафикциональных сущностей",
      "Исследование разрывов в повествовательной ткани",
      "Разработка защиты от патафизических угроз",
      "Анализ взаимодействия между нарративными слоями"
    ],
    relatedSCPs: [
      {
        id: "SCP-3309",
        name: "Где мы идём...",
        description: "Феномен удаления статей из базы данных. Возможное вмешательство автора."
      },
      {
        id: "SCP-2747",
        name: "Ниже",
        description: "Анти-нарративная сущность, уничтожающая истории и их реальности."
      },
      {
        id: "SCP-5999",
        name: "Это место недоступно",
        description: "Патафизическая аномалия, связанная с разрушением повествования."
      }
    ],
    incidents: [
      "Операция 'OverMeta': Обнаружение признаков существования авторов нашей реальности.",
      "Событие S Andrew Swann: Доказательство существования писателей как богов.",
      "Протокол Анти-Нарратива: Защита от сущностей, питающихся историями."
    ],
    researchHubs: [
      {
        name: "Патафизический Отдел",
        description: "Элитное подразделение, изучающее природу реальности как повествования."
      },
      {
        name: "Проект 'Четвёртая Стена'",
        description: "Исследование границ между фикцией и реальностью."
      }
    ]
  },
  "psionics": {
    id: "psionics",
    name: "Псионика",
    icon: "Brain",
    color: "bg-blue-900/50 border-blue-600",
    shortDesc: "Исследование телепатии, телекинеза и других экстрасенсорных способностей.",
    fullDescription: "Псионика — изучение ментальных способностей и психических сил, превосходящих обычные человеческие возможности. Включает телепатию, телекинез, предвидение, психокинез и другие формы взаимодействия разума с материей и сознаниями. Фонд классифицирует псионические способности по шкале от Пси-1 до Пси-10.",
    principles: [
      "Разум может воздействовать на материю без физического контакта",
      "Псионические способности измеряются по шкале Пси",
      "Телепатия возможна через квантовое сцепление сознаний",
      "Психическая энергия — реальная измеримая величина",
      "Некоторые индивиды обладают врождённым псионическим потенциалом"
    ],
    applications: [
      "Обучение персонала телепатической коммуникации",
      "Разработка психических экранов против ментальных атак",
      "Использование телекинеза для безопасной работы с опасными объектами",
      "Детектирование псионических угроз",
      "Исследование коллективного сознания"
    ],
    relatedSCPs: [
      {
        id: "SCP-076",
        name: "Авель",
        description: "Субъект демонстрирует возможные псионические способности в бою."
      },
      {
        id: "SCP-2295",
        name: "Мишка-хирург",
        description: "Плюшевая игрушка с телекинетическими хирургическими способностями."
      },
      {
        id: "SCP-590",
        name: "Он знает, когда вам больно",
        description: "Человек с эмпатическими целительными способностями."
      }
    ],
    incidents: [
      "Эксперимент Менталист-7: Успешная телепатическая связь на расстоянии 5000 км.",
      "Инцидент Психокинез-Альфа: Неконтролируемый всплеск телекинеза разрушил лабораторию.",
      "Проект 'Разумный Щит': Создание психических барьеров против ментальных атак."
    ],
    researchHubs: [
      {
        name: "Институт псионических исследований",
        description: "Центр изучения психических способностей и обучения персонала."
      },
      {
        name: "Проект 'Менталист'",
        description: "Программа развития псионических агентов для полевых операций."
      }
    ]
  },
  "semiosphere": {
    id: "semiosphere",
    name: "Семиосфера",
    icon: "Code2",
    color: "bg-pink-900/50 border-pink-600",
    shortDesc: "Изучение знаков, символов и их влияния на реальность.",
    fullDescription: "Семиосфера — концептуальное пространство, в котором существуют знаки, символы и идеи. В аномальном контексте, семиосфера изучает как символы и концепты могут физически влиять на реальность, существовать как независимые сущности и передаваться между сознаниями как вирусы или паразиты.",
    principles: [
      "Идеи и концепты могут существовать как физические сущности",
      "Символы обладают реальной силой воздействия",
      "Семиотические вирусы могут заражать сознания",
      "Ноосфера — пространство чистых идей",
      "Концептуальные сущности питаются верой и вниманием"
    ],
    applications: [
      "Создание защитных символов и сигил",
      "Изучение меметических агентов и их распространения",
      "Исследование концептуальных сущностей",
      "Разработка антимеметических контрмер",
      "Анализ символических систем аномального происхождения"
    ],
    relatedSCPs: [
      {
        id: "SCP-INTEGER",
        name: "Концептуальная сущность",
        description: "Живая идея, существующая в ноосфере и способная влиять на реальность."
      },
      {
        id: "SCP-033",
        name: "Недостающее число",
        description: "Целое число, не существующее в нормальной математике, но влияющее на реальность."
      },
      {
        id: "SCP-3930",
        name: "Паттерн-крикун",
        description: "Отсутствие, воспринимаемое как присутствие через семиотическое давление."
      }
    ],
    incidents: [
      "Событие Символ-Омега: Обнаружение символа, изменяющего реальность при наблюдении.",
      "Инцидент Ноосферы: Вторжение концептуальной сущности в материальный мир.",
      "Проект 'Идеовирус': Разработка концептуальных вакцин против меметических угроз."
    ],
    researchHubs: [
      {
        name: "Кафедра семиотики",
        description: "Отдел, изучающий символические системы и их влияние на реальность."
      },
      {
        name: "Ноосферная Обсерватория",
        description: "Станция мониторинга концептуального пространства."
      }
    ]
  }
};

const ParascienceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const parascience = id ? parascienceDatabase[id] : null;

  if (!parascience) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 border-2 border-primary">
          <div className="text-center space-y-4">
            <Icon name="AlertTriangle" className="w-12 h-12 text-primary mx-auto" />
            <h1 className="text-2xl font-bold">ОШИБКА ДОСТУПА</h1>
            <p className="text-muted-foreground">Раздел паранауки не найден</p>
            <Button onClick={() => navigate('/')} variant="outline">
              <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
              ВЕРНУТЬСЯ
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4 animate-fade-in">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
            ГЛАВНАЯ
          </Button>
          <div className="h-8 w-px bg-border"></div>
          <div className="flex items-center gap-2">
            <Icon name="Atom" className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              ПАРАНАУКА
            </span>
          </div>
        </div>

        <Card className={`border-2 ${parascience.color} p-8 animate-fade-in`}>
          <div className="space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Icon name={parascience.icon as any} className="w-16 h-16 text-primary" />
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {parascience.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {parascience.shortDesc}
                  </p>
                </div>
              </div>
              <Badge className="border-primary text-primary text-lg px-4 py-2" variant="outline">
                НАУЧНЫЙ ОТДЕЛ
              </Badge>
            </div>

            <Separator className="bg-primary/30" />

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="principles">Принципы</TabsTrigger>
                <TabsTrigger value="scps">SCP Объекты</TabsTrigger>
                <TabsTrigger value="research">Исследования</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="FileText" className="w-6 h-6 text-primary" />
                    Полное описание
                  </h2>
                  <p className="text-base leading-relaxed text-foreground">
                    {parascience.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Wrench" className="w-5 h-5 text-primary" />
                    Практические применения
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {parascience.applications.map((app, index) => (
                      <Card key={index} className="p-4 bg-card/50 border-border">
                        <p className="text-sm">{app}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="principles" className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Lightbulb" className="w-6 h-6 text-primary" />
                  Основные принципы
                </h2>
                <div className="space-y-3">
                  {parascience.principles.map((principle, index) => (
                    <Card key={index} className="p-5 bg-primary/5 border-primary/30">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-bold">{index + 1}</span>
                        </div>
                        <p className="text-base pt-1">{principle}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="scps" className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Lock" className="w-6 h-6 text-primary" />
                  Связанные SCP объекты
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {parascience.relatedSCPs.map((scp, index) => (
                    <Card key={index} className="p-6 border-2 border-primary/30 hover:border-primary transition-colors">
                      <h3 className="text-xl font-bold text-primary mb-2">{scp.id}</h3>
                      <p className="text-sm text-muted-foreground uppercase mb-3">"{scp.name}"</p>
                      <p className="text-sm">{scp.description}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="research" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="AlertTriangle" className="w-6 h-6 text-primary" />
                    Значимые инциденты
                  </h2>
                  <div className="space-y-3">
                    {parascience.incidents.map((incident, index) => (
                      <Card key={index} className="p-5 bg-destructive/5 border-destructive/30">
                        <p className="text-sm">{incident}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Building2" className="w-6 h-6 text-primary" />
                    Исследовательские хабы
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {parascience.researchHubs.map((hub, index) => (
                      <Card key={index} className="p-6 bg-card/50 border-primary/30">
                        <h3 className="text-lg font-bold mb-2 text-primary">{hub.name}</h3>
                        <p className="text-sm text-muted-foreground">{hub.description}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        <footer className="border-t border-border pt-6 text-center text-xs text-muted-foreground animate-fade-in">
          <p className="mb-2">НАУЧНЫЙ ДЕПАРТАМЕНТ ФОНДА SCP</p>
          <p>Классификация: Совершенно секретно • Уровень доступа 3+</p>
        </footer>
      </div>
    </div>
  );
};

export default ParascienceDetail;
