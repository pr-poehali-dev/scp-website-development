import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SCPDocument {
  id: string;
  class: 'Safe' | 'Euclid' | 'Keter';
  name: string;
  description: string;
  containment: string;
}

const scpDocuments: SCPDocument[] = [
  {
    id: "SCP-173",
    class: "Euclid",
    name: "Скульптура",
    description: "Объект состоит из бетона и арматуры с следами краски Krylon. Анимирован и чрезвычайно враждебен.",
    containment: "Постоянный зрительный контакт с SCP-173 должен поддерживаться все время. Персонал должен предупреждать друг друга перед морганием."
  },
  {
    id: "SCP-096",
    class: "Euclid",
    name: "Застенчивый парень",
    description: "Гуманоид ростом приблизительно 2.38 метра. Субъект демонстрирует очень малую мышечную массу.",
    containment: "SCP-096 должен содержаться в герметичной 5м х 5м х 5м стальной камере в Зоне 17."
  },
  {
    id: "SCP-682",
    class: "Keter",
    name: "Неуязвимая рептилия",
    description: "Большое существо неизвестного происхождения. Демонстрирует высокий интеллект и исключительную враждебность.",
    containment: "SCP-682 должен быть уничтожен как можно скорее. На данный момент никакой известный метод не может полностью уничтожить объект."
  },
  {
    id: "SCP-999",
    class: "Safe",
    name: "Щекотливая масса",
    description: "Аморфная желеобразная масса оранжевого цвета. Демонстрирует дружелюбное поведение по отношению ко всем живым существам.",
    containment: "SCP-999 содержится в камере 5м х 5м. Персонал может свободно взаимодействовать с объектом."
  },
  {
    id: "SCP-087",
    class: "Euclid",
    name: "Лестница",
    description: "Неосвещенная лестничная клетка. Лестница представляется бесконечно уходящей вниз.",
    containment: "SCP-087 должен быть запечатан в любое время, когда нет активного исследования. Доступ разрешен только персоналу уровня 2 и выше."
  },
  {
    id: "SCP-049",
    class: "Euclid",
    name: "Чумной доктор",
    description: "Гуманоидное существо, напоминающее средневекового чумного доктора. Объект высоко интеллектуален и способен к речи.",
    containment: "SCP-049 содержится в стандартной гуманоидной камере содержания в Зоне 12."
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');

  const filteredDocuments = scpDocuments.filter(doc => {
    const matchesSearch = doc.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'all' || doc.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const getClassColor = (scpClass: string) => {
    switch(scpClass) {
      case 'Safe': return 'bg-green-900/30 text-green-400 border-green-700';
      case 'Euclid': return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
      case 'Keter': return 'bg-red-900/30 text-red-400 border-red-700';
      default: return '';
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 border-2 border-destructive animate-fade-in">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Icon name="AlertTriangle" className="w-12 h-12 text-destructive animate-pulse-red" />
              </div>
              <h1 className="text-3xl font-bold tracking-wider">ПРЕДУПРЕЖДЕНИЕ</h1>
              <div className="h-1 w-full bg-destructive"></div>
            </div>
            
            <div className="space-y-4 text-left">
              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                КЛАССИФИКАЦИЯ: СОВЕРШЕННО СЕКРЕТНО
              </p>
              
              <div className="border-l-4 border-destructive pl-4 space-y-2">
                <p className="text-sm">
                  Доступ к следующим файлам ограничен персоналом уровня 2 и выше.
                  Несанкционированный доступ запрещен и будет караться в соответствии с Протоколом 12.
                </p>
                <p className="text-sm">
                  Вы входите в базу данных Фонда SCP — организации, специализирующейся
                  на содержании и изучении аномальных объектов, сущностей и явлений.
                </p>
              </div>

              <div className="bg-muted/20 p-4 border border-border space-y-2">
                <p className="text-xs font-bold text-destructive">НАПОМИНАНИЕ ПЕРСОНАЛУ:</p>
                <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Не обсуждайте содержимое документов с неавторизованным персоналом</li>
                  <li>Соблюдайте протоколы содержания в точности</li>
                  <li>Немедленно сообщайте о нарушениях содержания</li>
                </ul>
              </div>
            </div>

            <Button 
              onClick={() => setAuthorized(true)}
              className="w-full bg-destructive hover:bg-destructive/80 text-white font-bold tracking-wider"
            >
              <Icon name="Lock" className="w-4 h-4 mr-2" />
              ПОДТВЕРДИТЬ ДОСТУП УРОВНЯ 2
            </Button>

            <p className="text-xs text-muted-foreground">
              СИСТЕМА БЕЗОПАСНОСТИ ФОНДА SCP • ВЕРСИЯ 4.2.1
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="border-b-2 border-destructive pb-4 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Icon name="Shield" className="w-8 h-8 text-destructive" />
              <h1 className="text-3xl font-bold tracking-wider">ФОНД SCP</h1>
            </div>
            <Badge variant="destructive" className="px-3 py-1">
              УРОВЕНЬ 2
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            Secure. Contain. Protect.
          </p>
        </header>

        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <Icon name="FileText" className="w-5 h-5 text-destructive" />
            <h2 className="text-xl font-bold tracking-wide">АРХИВ ДОКУМЕНТОВ</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по ID или названию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-card border-border"
              />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-full sm:w-[200px] bg-card border-border">
                <SelectValue placeholder="Класс объекта" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все классы</SelectItem>
                <SelectItem value="Safe">Safe</SelectItem>
                <SelectItem value="Euclid">Euclid</SelectItem>
                <SelectItem value="Keter">Keter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc, index) => (
            <Card 
              key={doc.id} 
              className="p-6 border-2 border-border hover:border-destructive transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-destructive group-hover:scp-glitch">
                      {doc.id}
                    </h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">
                      "{doc.name}"
                    </p>
                  </div>
                  <Badge className={`${getClassColor(doc.class)} border`}>
                    {doc.class}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Описание:
                    </p>
                    <p className="text-sm">
                      {doc.description}
                    </p>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Особые процедуры содержания:
                    </p>
                    <p className="text-sm">
                      {doc.containment}
                    </p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
                  onClick={() => navigate(`/scp/${doc.id}`)}
                >
                  <Icon name="FileSearch" className="w-4 h-4 mr-2" />
                  ОТКРЫТЬ ПОЛНЫЙ ОТЧЕТ
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Документы не найдены</p>
          </div>
        )}

        <footer className="border-t border-border pt-6 mt-12 text-center text-xs text-muted-foreground">
          <p>ФОНД SCP • СОДЕРЖАТЬ • СОХРАНЯТЬ • ЗАЩИЩАТЬ</p>
          <p className="mt-2">Все документы классифицированы. Распространение запрещено.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;