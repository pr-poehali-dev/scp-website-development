import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';

interface Parascience {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const parasciences: Parascience[] = [
  {
    id: "antimemetics",
    name: "Антимеметика",
    description: "Изучение идей и объектов, которые сопротивляются запоминанию и распространению. Антимемы существуют вне человеческого восприятия и памяти.",
    icon: "EyeOff",
    color: "bg-slate-900/50 border-slate-600"
  },
  {
    id: "thaumatology",
    name: "Тауматология",
    description: "Наука о магии и аномальных манипуляциях реальностью. Изучает механизмы действия магических эффектов и их применение.",
    icon: "Sparkles",
    color: "bg-emerald-900/50 border-emerald-600"
  },
  {
    id: "alchemy",
    name: "Алхимия",
    description: "Трансмутация материи через аномальные процессы. Создание философского камня и изучение превращения элементов.",
    icon: "FlaskConical",
    color: "bg-amber-900/50 border-amber-600"
  },
  {
    id: "surrealism",
    name: "Сюрреалистика",
    description: "Исследование нелогичных, парадоксальных явлений и объектов, нарушающих причинно-следственные связи.",
    icon: "Shapes",
    color: "bg-purple-900/50 border-purple-600"
  },
  {
    id: "pataphysics",
    name: "Патафизика",
    description: "Наука об исключениях и воображаемых решениях. Изучение законов, управляющих исключениями из законов природы.",
    icon: "Infinity",
    color: "bg-cyan-900/50 border-cyan-600"
  },
  {
    id: "psionics",
    name: "Псионика",
    description: "Исследование телепатии, телекинеза и других экстрасенсорных способностей. Изучение силы разума над материей.",
    icon: "Brain",
    color: "bg-blue-900/50 border-blue-600"
  },
  {
    id: "semiosphere",
    name: "Семиосфера",
    description: "Изучение знаков, символов и их влияния на реальность. Аномальная семиотика и концептуальные сущности.",
    icon: "Code2",
    color: "bg-pink-900/50 border-pink-600"
  }
];

const departments: Department[] = [
  {
    id: "public-history",
    name: "Департамент публичной истории",
    description: "Занимается публичными записями исторических событий с участием аномалий.",
    icon: "BookOpen"
  },
  {
    id: "clean-spaces",
    name: "Отдел чистилищных пространств",
    description: "Выявляет, исследует и разрабатывает Чистилищные Пространства - посмертные реальности нехожей природы.",
    icon: "Wind"
  },
  {
    id: "robotics",
    name: "Кафедра робототехники и кибернетики",
    description: "Разрабатывает роботизированные конструкции для целей сдерживания аномалий.",
    icon: "Bot"
  },
  {
    id: "science-dept",
    name: "Отделение наук",
    description: "Научный отдел управляет всеми научно-исследовательскими отделами и их проектами.",
    icon: "Microscope"
  },
  {
    id: "semiotics",
    name: "Кафедра семиотики",
    description: "Содержит и исследует аномалии, связанные с семиосферой или находящиеся в ней.",
    icon: "MessageSquare"
  },
  {
    id: "solar-system",
    name: "Департамент надзора за солнечной системой",
    description: "Отслеживает и исследует аномалии в Солнечной системе.",
    icon: "Orbit"
  },
  {
    id: "spectral",
    name: "Отдел спектральных явлений",
    description: "Отдел усилился, изучает явления, привидения и другие спектральные аномалии.",
    icon: "Ghost"
  },
  {
    id: "tactical-math",
    name: "Кафедра тактической математики",
    description: "Отдел, специализирующийся на изучении аномальной математики в интересах Фонда.",
    icon: "Calculator"
  },
  {
    id: "temporal",
    name: "Отдел временных исследований",
    description: "Занимается изучением аномалий, связанных со временем. Базируется в Зоне 223.",
    icon: "Clock"
  },
  {
    id: "linguistics",
    name: "Кафедра теоралингвистики",
    description: "Расшифровывает, изучает и переводит земные языки.",
    icon: "Languages"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParasciences = parasciences.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDepartments = departments.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="border-b border-primary/30 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Icon name="Atom" className="w-10 h-10 text-primary" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">НАУЧНЫЙ ДЕПАРТАМЕНТ</h1>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  SCP Foundation • Scientific Department
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-primary text-primary px-4 py-2">
              УРОВЕНЬ 3
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Tabs defaultValue="parasciences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="parasciences">Паранауки</TabsTrigger>
            <TabsTrigger value="departments">Отделы</TabsTrigger>
          </TabsList>

          <div className="mb-6">
            <Input
              placeholder="Поиск по разделам..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md bg-card border-border"
            />
          </div>

          <TabsContent value="parasciences" className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Atom" className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Аномальные науки</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Департамент изучает паранаучные дисциплины — области знаний, выходящие за рамки 
                традиционной науки и занимающиеся аномальными явлениями.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredParasciences.map((science, index) => (
                <Card
                  key={science.id}
                  className={`p-6 border-2 ${science.color} hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Icon name={science.icon as any} className="w-12 h-12 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{science.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {science.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredParasciences.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Паранаук не найдено</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Building2" className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Научные подразделения</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Отделы и кафедры Научного Департамента, специализирующиеся на различных 
                направлениях аномальных исследований.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredDepartments.map((dept, index) => (
                <Card
                  key={dept.id}
                  className="p-6 border border-border hover:border-primary transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name={dept.icon as any} className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{dept.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {dept.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredDepartments.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Отделов не найдено</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <footer className="border-t border-border pt-8 mt-16 text-center text-xs text-muted-foreground">
          <p className="mb-2">НАУЧНЫЙ ДЕПАРТАМЕНТ ФОНДА SCP</p>
          <p>Исследования • Анализ • Понимание аномального</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
