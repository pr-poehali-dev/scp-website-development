import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface SCPDocument {
  id: string;
  class: 'Safe' | 'Euclid' | 'Keter';
  name: string;
  description: string;
  containment: string;
  fullDescription: string;
  discoveryDate: string;
  location: string;
  incidentReports?: string[];
}

const scpDatabase: Record<string, SCPDocument> = {
  "SCP-173": {
    id: "SCP-173",
    class: "Euclid",
    name: "Скульптура",
    description: "Объект состоит из бетона и арматуры с следами краски Krylon. Анимирован и чрезвычайно враждебен.",
    containment: "Постоянный зрительный контакт с SCP-173 должен поддерживаться все время. Персонал должен предупреждать друг друга перед морганием.",
    fullDescription: "SCP-173 перемещается к своей жертве и убивает путем разрыва шеи у основания черепа или удушения. В случае нападения на человека подобный исход неизбежен. В присутствии SCP-173 линия прямой видимости не должна нарушаться ни при каких обстоятельствах. Персонал, работающий с SCP-173, должен напоминать друг другу моргать. Объект не может двигаться, пока находится в зоне прямого зрительного контакта. Некоторые образцы красно-коричневого вещества на полу камеры содержания принадлежат SCP-173 и представляют собой комбинацию фекалий и крови.",
    discoveryDate: "██.██.1993",
    location: "Зона 19, Камера содержания 173-A",
    incidentReports: [
      "Инцидент 173-██: Во время планового обслуживания системы освещения произошел полный отказ электросети. 4 жертвы.",
      "Инцидент 173-██: Персонал D-класса нарушил протокол наблюдения. 2 жертвы."
    ]
  },
  "SCP-096": {
    id: "SCP-096",
    class: "Euclid",
    name: "Застенчивый парень",
    description: "Гуманоид ростом приблизительно 2.38 метра. Субъект демонстрирует очень малую мышечную массу.",
    containment: "SCP-096 должен содержаться в герметичной 5м х 5м х 5м стальной камере в Зоне 17.",
    fullDescription: "SCP-096 обычно чрезвычайно покорен, с датчиков давления внутри камеры можно наблюдать, что он проводит большую часть дня, бродя по восточной стене. Однако, когда кто-либо видит лицо SCP-096 (напрямую, через видеозапись или даже на фотографии), субъект входит в состояние значительного эмоционального расстройства. SCP-096 накроет своё лицо руками и начнёт кричать, плакать и издавать бессвязные звуки. Приблизительно через одну-две минуты SCP-096 начнет бежать к человеку, который видел его лицо. Документированная скорость варьируется от 35 км/ч до ███ км/ч.",
    discoveryDate: "██.██.2003",
    location: "Зона 17, Камера содержания 096-A",
    incidentReports: [
      "Инцидент 096-1-A: Попытка прекращения SCP-096. Провал. ██ жертв.",
      "Инцидент 096-1-██: Утечка содержания после просмотра спутникового снимка. ████ жертв по всему миру."
    ]
  },
  "SCP-682": {
    id: "SCP-682",
    class: "Keter",
    name: "Неуязвимая рептилия",
    description: "Большое существо неизвестного происхождения. Демонстрирует высокий интеллект и исключительную враждебность.",
    containment: "SCP-682 должен быть уничтожен как можно скорее. На данный момент никакой известный метод не может полностью уничтожить объект.",
    fullDescription: "SCP-682 — массивное существо рептилоподобного происхождения, демонстрирующее высокий интеллект и ненависть ко всей жизни. SCP-682 обладает чрезвычайной силой, скоростью и рефлексами. Субъект продемонстрировал способность к адаптации и регенерации при повреждении. SCP-682 постоянно растёт и изменяется в зависимости от того, чем питается, и способен пережить практически любое ранение. Объект может выживать в течение длительных периодов без питания и продемонстрировал способность регенерировать из малейших образцов ткани.",
    discoveryDate: "██.██.1██",
    location: "Зона 19, Камера содержания 682-OMEGA",
    incidentReports: [
      "Инцидент 682-E18: Попытка уничтожения с использованием SCP-173. Провал.",
      "Инцидент 682-E22: Попытка уничтожения с использованием термоядерного взрыва. Частичный успех, полная регенерация через 18 часов.",
      "Инцидент 682-E███: Утечка содержания. ███ жертв, восстановление через 27 часов."
    ]
  },
  "SCP-999": {
    id: "SCP-999",
    class: "Safe",
    name: "Щекотливая масса",
    description: "Аморфная желеобразная масса оранжевого цвета. Демонстрирует дружелюбное поведение по отношению ко всем живым существам.",
    containment: "SCP-999 содержится в камере 5м х 5м. Персонал может свободно взаимодействовать с объектом.",
    fullDescription: "SCP-999 выглядит как большая желеобразная масса оранжевой слизи, весящая около 54 кг с устойчивостью и текстурой, напоминающей арахисовое масло. SCP-999 демонстрирует игривое и доброжелательное поведение, и те, кто вступают в контакт с ним, сообщают о чувстве эйфории и счастья. Эффект длится продолжительное время после контакта и приводит к значительному улучшению настроения. SCP-999 питается конфетами и другими сладостями. При контакте с человеком SCP-999 издаёт булькающие звуки счастья и нежно щекочет своими псевдоподиями.",
    discoveryDate: "██.██.1985",
    location: "Зона 17, Камера содержания 999",
    incidentReports: [
      "Заметка: Взаимодействие с SCP-999 используется в качестве награды для персонала с высокими показателями работы.",
      "Эксперимент 999-D: Контакт SCP-999 с SCP-682 привёл к [ДАННЫЕ УДАЛЕНЫ]."
    ]
  },
  "SCP-087": {
    id: "SCP-087",
    class: "Euclid",
    name: "Лестница",
    description: "Неосвещенная лестничная клетка. Лестница представляется бесконечно уходящей вниз.",
    containment: "SCP-087 должен быть запечатан в любое время, когда нет активного исследования. Доступ разрешен только персоналу уровня 2 и выше.",
    fullDescription: "SCP-087 представляет собой неосвещённую лестничную клетку. Лестница уходит вниз под углом 38 градусов на глубину 13 ступеней, после чего наступает площадка примерно 3 метра в ширину и повторяет цикл. Освещение не распространяется дальше 1.5 лестничных пролётов. Исследования показали, что лестница уходит вниз не менее чем на 60 км. Периодически из глубин слышны звуки бедствия, обычно плач ребёнка. Также в SCP-087 обитает SCP-087-1 — сущность с лицом без видимых глаз, носа или рта.",
    discoveryDate: "██.██.2003",
    location: "Кампус университета █████, здание ██",
    incidentReports: [
      "Исследование 087-I: Субъект D-8432 спустился на 200 метров. Звуки плача усиливались. Миссия прервана.",
      "Исследование 087-IV: Субъект D-9884 встретил SCP-087-1 на глубине ███ метров. Контакт потерян."
    ]
  },
  "SCP-049": {
    id: "SCP-049",
    class: "Euclid",
    name: "Чумной доктор",
    description: "Гуманоидное существо, напоминающее средневекового чумного доктора. Объект высоко интеллектуален и способен к речи.",
    containment: "SCP-049 содержится в стандартной гуманоидной камере содержания в Зоне 12.",
    fullDescription: "SCP-049 — гуманоидная сущность ростом 1.9 метра, внешне напоминающая средневекового чумного доктора. Маска, халат и перчатки субъекта являются частью его тела. SCP-049 высоко интеллектуален и способен к речи на различных языках. Субъект одержим желанием излечить то, что он называет 'Чумой', хотя попытки определить, что именно он подразумевает под этим термином, не увенчались успехом. При контакте с живыми людьми SCP-049 убивает их прикосновением к коже и затем проводит 'хирургическую' процедуру, результатом которой становится реанимированный труп (SCP-049-2).",
    discoveryDate: "██.██.1██",
    location: "Зона 12, Камера содержания 049",
    incidentReports: [
      "Инцидент 049-A: Утечка содержания. 3 жертвы, 5 экземпляров SCP-049-2 созданы.",
      "Интервью 049-█: SCP-049 заявил, что его работа 'почти завершена' и что он чувствует Чуму 'повсюду'."
    ]
  }
};

const SCPDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const scp = id ? scpDatabase[id.toUpperCase()] : null;

  if (!scp) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 border-2 border-destructive">
          <div className="text-center space-y-4">
            <Icon name="AlertTriangle" className="w-12 h-12 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold">ОШИБКА ДОСТУПА</h1>
            <p className="text-muted-foreground">Документ не найден в базе данных</p>
            <Button onClick={() => navigate('/')} variant="outline">
              <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
              ВЕРНУТЬСЯ В АРХИВ
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const getClassColor = (scpClass: string) => {
    switch(scpClass) {
      case 'Safe': return 'bg-green-900/30 text-green-400 border-green-700';
      case 'Euclid': return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
      case 'Keter': return 'bg-red-900/30 text-red-400 border-red-700';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 animate-fade-in">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-white"
          >
            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
            АРХИВ
          </Button>
          <div className="h-8 w-px bg-border"></div>
          <div className="flex items-center gap-2">
            <Icon name="FileText" className="w-5 h-5 text-destructive" />
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              ДОСЬЕ ОБЪЕКТА
            </span>
          </div>
        </div>

        <Card className="border-2 border-destructive p-8 animate-fade-in">
          <div className="space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold text-destructive mb-2 scp-glitch">
                  {scp.id}
                </h1>
                <p className="text-xl text-muted-foreground uppercase tracking-wide">
                  Кодовое имя: "{scp.name}"
                </p>
              </div>
              <Badge className={`${getClassColor(scp.class)} border text-lg px-4 py-2`}>
                КЛАСС: {scp.class}
              </Badge>
            </div>

            <Separator className="bg-destructive" />

            <div className="space-y-6">
              <div className="bg-muted/10 border-l-4 border-destructive p-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-destructive mb-3">
                  <Icon name="Lock" className="w-4 h-4 inline mr-2" />
                  Особые процедуры содержания
                </h2>
                <p className="text-sm leading-relaxed">
                  {scp.containment}
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-destructive mb-3">
                  <Icon name="Info" className="w-4 h-4 inline mr-2" />
                  Описание объекта
                </h2>
                <p className="text-sm leading-relaxed">
                  {scp.fullDescription}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-card/50 border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Дата обнаружения:
                  </p>
                  <p className="text-sm font-bold">{scp.discoveryDate}</p>
                </Card>
                <Card className="p-4 bg-card/50 border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Место содержания:
                  </p>
                  <p className="text-sm font-bold">{scp.location}</p>
                </Card>
              </div>

              {scp.incidentReports && scp.incidentReports.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-destructive mb-3">
                    <Icon name="AlertTriangle" className="w-4 h-4 inline mr-2" />
                    Отчёты об инцидентах
                  </h2>
                  <div className="space-y-2">
                    {scp.incidentReports.map((report, index) => (
                      <Card key={index} className="p-4 bg-destructive/5 border-destructive/30">
                        <p className="text-sm">{report}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator className="bg-border" />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
              >
                <Icon name="Download" className="w-4 h-4 mr-2" />
                СКАЧАТЬ ПОЛНЫЙ ОТЧЁТ
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
              >
                <Icon name="History" className="w-4 h-4 mr-2" />
                ИСТОРИЯ ИЗМЕНЕНИЙ
              </Button>
            </div>
          </div>
        </Card>

        <footer className="border-t border-border pt-6 text-center text-xs text-muted-foreground animate-fade-in">
          <p>ФОНД SCP • КЛАССИФИКАЦИЯ: СОВЕРШЕННО СЕКРЕТНО</p>
          <p className="mt-2">Несанкционированный доступ запрещён</p>
        </footer>
      </div>
    </div>
  );
};

export default SCPDetail;
