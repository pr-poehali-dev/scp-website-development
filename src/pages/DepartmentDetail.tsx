import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface DepartmentData {
  id: string;
  name: string;
  icon: string;
  shortDesc: string;
  fullDescription: string;
  responsibilities: string[];
  location: string;
  personnel: number;
  director: string;
  relatedProjects: Array<{ name: string; description: string }>;
  achievements: string[];
}

const departmentDatabase: Record<string, DepartmentData> = {
  "public-history": {
    id: "public-history",
    name: "Департамент публичной истории",
    icon: "BookOpen",
    shortDesc: "Занимается публичными записями исторических событий с участием аномалий.",
    fullDescription: "Департамент публичной истории отвечает за документирование исторических событий, связанных с аномальными явлениями, и создание официальных записей для публичного доступа. Отдел работает над сохранением исторической точности при одновременном соблюдении протоколов информационной безопасности. Занимается исследованием исторических артефактов аномального происхождения и их влияния на ход человеческой истории.",
    responsibilities: [
      "Документирование исторических аномальных событий",
      "Создание и поддержка архива исторических записей",
      "Исследование влияния аномалий на исторические процессы",
      "Подготовка дезинформационных материалов для общественности",
      "Сотрудничество с академическими учреждениями"
    ],
    location: "Зона-12, Сектор исторических исследований",
    personnel: 87,
    director: "Д-р Маркус Велиниус",
    relatedProjects: [
      {
        name: "Проект 'Хроники'",
        description: "Полная хронология аномальных событий в истории человечества."
      },
      {
        name: "Операция 'Переписать историю'",
        description: "Исправление исторических записей для сокрытия аномальных событий."
      }
    ],
    achievements: [
      "Создание полной базы данных исторических аномалий с 3000 г. до н.э.",
      "Успешная дезинформация о Тунгусском метеорите 1908 года",
      "Обнаружение связи между историческими пандемиями и SCP-объектами"
    ]
  },
  "clean-spaces": {
    id: "clean-spaces",
    name: "Отдел чистилищных пространств",
    icon: "Wind",
    shortDesc: "Выявляет, исследует и разрабатывает Чистилищные Пространства.",
    fullDescription: "Отдел чистилищных пространств специализируется на изучении посмертных реальностей и измерений, связанных с загробной жизнью. Эти пространства часто являются промежуточными зонами между жизнью и смертью, где могут существовать души, духи или другие постмертные сущности. Отдел занимается картографированием этих измерений, изучением их законов и разработкой методов безопасного взаимодействия.",
    responsibilities: [
      "Обнаружение и картографирование чистилищных измерений",
      "Исследование постмортальных явлений и сущностей",
      "Разработка протоколов безопасного входа в посмертные реальности",
      "Изучение взаимодействия между миром живых и мертвых",
      "Содержание объектов, связанных с загробной жизнью"
    ],
    location: "Зона-666, Крыло метафизических исследований",
    personnel: 54,
    director: "Д-р Елена Мортис",
    relatedProjects: [
      {
        name: "Проект 'Врата Аида'",
        description: "Создание стабильного портала в чистилищные измерения для исследований."
      },
      {
        name: "Операция 'Стикс'",
        description: "Картографирование границ между миром живых и мертвых."
      }
    ],
    achievements: [
      "Обнаружение 17 различных чистилищных измерений",
      "Успешное извлечение информации от постмортальных сущностей",
      "Разработка защитных протоколов от посмертных угроз"
    ]
  },
  "robotics": {
    id: "robotics",
    name: "Кафедра робототехники и кибернетики",
    icon: "Bot",
    shortDesc: "Разрабатывает роботизированные конструкции для целей сдерживания.",
    fullDescription: "Кафедра робототехники и кибернетики занимается проектированием, разработкой и внедрением роботизированных систем для содержания аномальных объектов. Отдел создает автоматизированные системы безопасности, роботов для работы в опасных условиях и киборг-технологии для усиления возможностей персонала. Также изучает аномальные механизмы и искусственный интеллект.",
    responsibilities: [
      "Разработка роботов для содержания опасных SCP-объектов",
      "Создание автоматизированных систем безопасности",
      "Исследование аномальных механических устройств",
      "Проектирование киборг-имплантатов для персонала",
      "Изучение искусственного интеллекта аномального происхождения"
    ],
    location: "Зона-5595, Лаборатория инженерной кибернетики",
    personnel: 142,
    director: "Д-р Виктор Механикус",
    relatedProjects: [
      {
        name: "Проект 'Стальной Страж'",
        description: "Разработка автономных роботов-охранников для зон содержания Keter-класса."
      },
      {
        name: "Программа 'Киборг'",
        description: "Создание кибернетических улучшений для оперативного персонала."
      }
    ],
    achievements: [
      "Создание роботов серии AEGIS для работы с радиоактивными аномалиями",
      "Разработка системы автоматического реагирования на утечки содержания",
      "Успешная интеграция кибернетических имплантатов в 500+ агентов"
    ]
  },
  "science-dept": {
    id: "science-dept",
    name: "Отделение наук",
    icon: "Microscope",
    shortDesc: "Управляет всеми научно-исследовательскими отделами и проектами.",
    fullDescription: "Отделение наук является центральным координирующим органом всех научных исследований в Фонде. Отдел управляет распределением ресурсов, устанавливает приоритеты исследований, координирует межотдельческое сотрудничество и обеспечивает соблюдение научных стандартов. Руководит всеми паранаучными направлениями и обеспечивает связь между исследовательскими подразделениями.",
    responsibilities: [
      "Координация всех научно-исследовательских отделов",
      "Распределение финансирования и ресурсов для исследований",
      "Установление приоритетов научных программ",
      "Обеспечение соблюдения научных протоколов и этики",
      "Публикация научных журналов Фонда"
    ],
    location: "Зона-1392, Центр научного управления",
    personnel: 203,
    director: "Д-р Александра Науков",
    relatedProjects: [
      {
        name: "Инициатива 'Единая наука'",
        description: "Интеграция всех паранаучных дисциплин в единую систему знаний."
      },
      {
        name: "Программа 'Прорыв'",
        description: "Финансирование высокорискованных исследований с потенциалом революционных открытий."
      }
    ],
    achievements: [
      "Координация более 10,000 активных исследовательских проектов",
      "Публикация 500+ научных статей ежегодно",
      "Создание единой базы данных всех научных знаний Фонда"
    ]
  },
  "semiotics": {
    id: "semiotics",
    name: "Кафедра семиотики",
    icon: "MessageSquare",
    shortDesc: "Исследует аномалии, связанные с семиосферой.",
    fullDescription: "Кафедра семиотики занимается изучением знаковых систем, символов и их аномального влияния на реальность. Отдел исследует как символы могут физически воздействовать на мир, изучает концептуальные сущности и семиотические вирусы. Работает в тесном сотрудничестве с Антимеметическим отделом и специалистами по меметическим угрозам.",
    responsibilities: [
      "Изучение аномальных знаковых систем",
      "Исследование концептуальных и семиотических сущностей",
      "Разработка защитных символов и сигил",
      "Анализ меметических и антимеметических угроз",
      "Содержание объектов семиосферной природы"
    ],
    location: "Зона-██, Кафедра символических исследований",
    personnel: 76,
    director: "Д-р Ирина Семиотова",
    relatedProjects: [
      {
        name: "Проект 'Живые Символы'",
        description: "Каталогизация и изучение символов, обладающих собственной волей."
      },
      {
        name: "Операция 'Концепт'",
        description: "Исследование сущностей, существующих как чистые идеи."
      }
    ],
    achievements: [
      "Создание библиотеки из 3000+ аномальных символов",
      "Разработка антимеметических контрмер на основе символической защиты",
      "Успешное содержание концептуальной сущности SCP-INTEGER"
    ]
  },
  "solar-system": {
    id: "solar-system",
    name: "Департамент надзора за солнечной системой",
    icon: "Orbit",
    shortDesc: "Отслеживает и исследует аномалии в Солнечной системе.",
    fullDescription: "Департамент надзора за солнечной системой отвечает за обнаружение, мониторинг и изучение аномальных явлений за пределами Земли. Отдел использует спутники, телескопы и космические зонды для наблюдения за аномальной активностью на других планетах, астероидах и в межпланетном пространстве. Сотрудничает с космическими агентствами под прикрытием.",
    responsibilities: [
      "Мониторинг космических аномалий в Солнечной системе",
      "Исследование внеземных артефактов и структур",
      "Отслеживание потенциальных внеземных угроз",
      "Координация с космическими агентствами",
      "Изучение аномальной астрономии"
    ],
    location: "Зона-42, Обсерватория космического надзора",
    personnel: 118,
    director: "Д-р Кирилл Астронов",
    relatedProjects: [
      {
        name: "Проект 'Дозорный'",
        description: "Сеть орбитальных датчиков для раннего обнаружения космических угроз."
      },
      {
        name: "Миссия 'Прометей'",
        description: "Исследование аномалий на спутниках Юпитера и Сатурна."
      }
    ],
    achievements: [
      "Обнаружение аномальной структуры на обратной стороне Луны",
      "Мониторинг 200+ космических аномалий",
      "Предотвращение столкновения аномального астероида с Землёй"
    ]
  },
  "spectral": {
    id: "spectral",
    name: "Отдел спектральных явлений",
    icon: "Ghost",
    shortDesc: "Изучает явления, привидения и спектральные аномалии.",
    fullDescription: "Отдел спектральных явлений специализируется на исследовании призраков, духов, привидений и других нематериальных сущностей. Отдел изучает природу спектральных проявлений, методы их обнаружения и способы взаимодействия с ними. Разрабатывает технологии для содержания бестелесных сущностей и протоколы экзорцизма.",
    responsibilities: [
      "Исследование природы призраков и духов",
      "Разработка методов обнаружения спектральных сущностей",
      "Создание протоколов содержания бестелесных объектов",
      "Изучение ектоплазмы и других спектральных материалов",
      "Проведение экзорцизмов и изгнаний"
    ],
    location: "Зона-███, Лаборатория спектральных исследований",
    personnel: 64,
    director: "Д-р Анна Спектрова",
    relatedProjects: [
      {
        name: "Проект 'Охотники за привидениями'",
        description: "Разработка портативного оборудования для работы со спектральными аномалиями."
      },
      {
        name: "Операция 'Экто'",
        description: "Изучение ектоплазмы как носителя спектральной энергии."
      }
    ],
    achievements: [
      "Каталогизация 500+ типов спектральных сущностей",
      "Разработка протокола успешного экзорцизма",
      "Создание ектоплазматических ловушек для содержания призраков"
    ]
  },
  "tactical-math": {
    id: "tactical-math",
    name: "Кафедра тактической математики",
    icon: "Calculator",
    shortDesc: "Специализируется на изучении аномальной математики.",
    fullDescription: "Кафедра тактической математики занимается исследованием математических аномалий, невозможных уравнений и чисел, не существующих в обычной математике. Отдел использует математические модели для предсказания поведения аномалий, создания защитных алгоритмов и взлома математических шифров аномального происхождения.",
    responsibilities: [
      "Изучение аномальных математических структур",
      "Разработка математических моделей аномалий",
      "Исследование невозможных чисел и уравнений",
      "Создание криптографических систем для Фонда",
      "Математический анализ реальностных сбоев"
    ],
    location: "Зона-5650, Институт математических наук",
    personnel: 92,
    director: "Д-р Пётр Математиков",
    relatedProjects: [
      {
        name: "Проект 'Эйлер'",
        description: "Каталогизация всех известных математических аномалий."
      },
      {
        name: "Операция 'Алгоритм'",
        description: "Создание предсказательных моделей для Keter-класса объектов."
      }
    ],
    achievements: [
      "Открытие SCP-033 (недостающее число)",
      "Разработка математической модели реальностных искривлений",
      "Создание квантовых криптосистем для защиты данных Фонда"
    ]
  },
  "temporal": {
    id: "temporal",
    name: "Отдел временных исследований",
    icon: "Clock",
    shortDesc: "Занимается изучением аномалий, связанных со временем.",
    fullDescription: "Отдел временных исследований изучает темпоральные аномалии, временные петли, парадоксы и объекты, способные манипулировать временем. Отдел разрабатывает методы обнаружения временных аномалий, протоколы работы с временными парадоксами и технологии защиты от темпоральных угроз. Базируется в специально изолированной Зоне-223 для предотвращения темпоральных загрязнений.",
    responsibilities: [
      "Исследование временных аномалий и парадоксов",
      "Мониторинг темпоральных сбоев в линейном времени",
      "Разработка протоколов работы с временными петлями",
      "Изучение объектов, манипулирующих временем",
      "Предотвращение темпоральных катастроф"
    ],
    location: "Зона-223, Северный Техас",
    personnel: 81,
    director: "Д-р Ричард Мортисон",
    relatedProjects: [
      {
        name: "Проект 'Хронос'",
        description: "Создание карты всех известных временных аномалий."
      },
      {
        name: "Операция 'Петля'",
        description: "Изучение и разрешение временных парадоксов."
      }
    ],
    achievements: [
      "Предотвращение 12 темпоральных парадоксов класса-XK",
      "Успешное выведение персонала из 47 временных петель",
      "Разработка детекторов темпоральных аномалий"
    ]
  },
  "linguistics": {
    id: "linguistics",
    name: "Кафедра теоралингвистики",
    icon: "Languages",
    shortDesc: "Расшифровывает, изучает и переводит земные языки.",
    fullDescription: "Кафедра теоралингвистики занимается изучением аномальных языков, древних письменностей и лингвистических структур, обладающих необычными свойствами. Отдел расшифровывает неизвестные языки, изучает слова силы и заклинания, исследует языки, способные изменять реальность при произношении. Работает с языками внеземного и внемерного происхождения.",
    responsibilities: [
      "Расшифровка древних и аномальных языков",
      "Изучение лингвистических структур с реальностными эффектами",
      "Перевод документов на неизвестных языках",
      "Исследование слов силы и заклинаний",
      "Работа с внеземными языковыми системами"
    ],
    location: "Зона-3609, Лингвистический центр",
    personnel: 97,
    director: "Д-р Мария Лингвова",
    relatedProjects: [
      {
        name: "Проект 'Вавилон'",
        description: "Создание универсального переводчика для всех известных языков."
      },
      {
        name: "Операция 'Слово'",
        description: "Каталогизация слов силы и их эффектов на реальность."
      }
    ],
    achievements: [
      "Расшифровка 200+ древних языков",
      "Перевод текстов SCP-287 и SCP-3609",
      "Создание словаря слов силы с 1000+ записями"
    ]
  }
};

const DepartmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const department = id ? departmentDatabase[id] : null;

  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 border-2 border-primary">
          <div className="text-center space-y-4">
            <Icon name="AlertTriangle" className="w-12 h-12 text-primary mx-auto" />
            <h1 className="text-2xl font-bold">ОШИБКА ДОСТУПА</h1>
            <p className="text-muted-foreground">Отдел не найден в базе данных</p>
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
            <Icon name="Building2" className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              НАУЧНОЕ ПОДРАЗДЕЛЕНИЕ
            </span>
          </div>
        </div>

        <Card className="border-2 border-primary p-8 animate-fade-in">
          <div className="space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={department.icon as any} className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {department.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {department.shortDesc}
                  </p>
                </div>
              </div>
              <Badge className="border-primary text-primary text-lg px-4 py-2" variant="outline">
                АКТИВЕН
              </Badge>
            </div>

            <Separator className="bg-primary/30" />

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 bg-card/50 border-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MapPin" className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase">Местоположение</p>
                </div>
                <p className="text-sm font-bold">{department.location}</p>
              </Card>
              <Card className="p-4 bg-card/50 border-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Users" className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase">Персонал</p>
                </div>
                <p className="text-sm font-bold">{department.personnel} сотрудников</p>
              </Card>
              <Card className="p-4 bg-card/50 border-primary/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="User" className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase">Директор</p>
                </div>
                <p className="text-sm font-bold">{department.director}</p>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="FileText" className="w-6 h-6 text-primary" />
                Описание отдела
              </h2>
              <p className="text-base leading-relaxed">
                {department.fullDescription}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="ClipboardList" className="w-6 h-6 text-primary" />
                Обязанности и функции
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {department.responsibilities.map((resp, index) => (
                  <Card key={index} className="p-4 bg-primary/5 border-primary/30">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                        <Icon name="Check" className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm">{resp}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Folder" className="w-6 h-6 text-primary" />
                Активные проекты
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {department.relatedProjects.map((project, index) => (
                  <Card key={index} className="p-6 border-2 border-primary/30 hover:border-primary transition-colors">
                    <h3 className="text-lg font-bold text-primary mb-2">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Award" className="w-6 h-6 text-primary" />
                Достижения отдела
              </h2>
              <div className="space-y-3">
                {department.achievements.map((achievement, index) => (
                  <Card key={index} className="p-5 bg-primary/5 border-primary/30">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Icon name="Star" className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm">{achievement}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <footer className="border-t border-border pt-6 text-center text-xs text-muted-foreground animate-fade-in">
          <p className="mb-2">НАУЧНЫЙ ДЕПАРТАМЕНТ ФОНДА SCP</p>
          <p>Классификация: Совершенно секретно • Только для персонала отдела</p>
        </footer>
      </div>
    </div>
  );
};

export default DepartmentDetail;
