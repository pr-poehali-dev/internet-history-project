import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const slides = [
  {
    id: 1,
    title: 'История создания и развития Интернета',
    subtitle: 'Исследовательский проект',
    type: 'title',
    gradient: 'from-primary via-secondary to-accent'
  },
  {
    id: 2,
    title: 'Почему эта тема важна?',
    type: 'content',
    gradient: 'from-primary to-secondary',
    stats: [
      { icon: 'Users', value: '70%', label: 'населения России — активные пользователи' },
      { icon: 'MessageSquare', value: '1', label: 'Основа современной коммуникации' },
      { icon: 'GraduationCap', value: '2', label: 'Ключевое средство для самообразования' },
      { icon: 'Shield', value: '3', label: 'Важный элемент цифровой грамотности' }
    ],
    goal: 'Проследить эволюцию Интернета и показать практическую значимость знаний'
  },
  {
    id: 3,
    title: 'ARPANET — прародитель Интернета',
    subtitle: '1969 год',
    type: 'timeline',
    gradient: 'from-secondary to-accent',
    facts: [
      { icon: 'Calendar', label: 'Дата', value: '29 октября 1969 года' },
      { icon: 'Mail', label: 'Первое сообщение', value: '"LO" (попытка отправить "LOGIN")' },
      { icon: 'Building', label: 'Создатель', value: 'Агентство DARPA (Минобороны США)' },
      { icon: 'Network', label: 'Протокол', value: 'NCP — первый протокол взаимодействия' }
    ],
    nodes: ['UCLA', 'Stanford', 'UCSB', 'Университет Юты']
  },
  {
    id: 4,
    title: 'TCP/IP — универсальный язык сетей',
    subtitle: '1970-е годы',
    type: 'tech',
    gradient: 'from-accent to-primary',
    authors: 'Винтон Серф и Роберт Кан',
    concepts: [
      { term: 'IP', description: 'Адрес на конверте (маршрутизация)', icon: 'MapPin' },
      { term: 'TCP', description: 'Надёжный почтальон (контроль передачи)', icon: 'Package' }
    ],
    milestone: '1 января 1983 года — переход ARPANET на TCP/IP',
    result: 'Объединение разных сетей в единую систему'
  },
  {
    id: 5,
    title: 'Всемирная паутина Тим Бернерса-Ли',
    subtitle: '1989 год',
    type: 'invention',
    gradient: 'from-primary to-accent',
    inventor: 'Тим Бернерс-Ли (ЦЕРН, Швейцария)',
    inventions: [
      { name: 'HTML', description: 'Язык разметки страниц', icon: 'Code' },
      { name: 'HTTP', description: 'Протокол передачи', icon: 'Globe' },
      { name: 'URL', description: 'Система адресов', icon: 'Link' }
    ],
    concept: 'Гипертекст — документы, связанные гиперссылками',
    firstSite: 'info.cern.ch (1991 г.)'
  },
  {
    id: 6,
    title: 'Бум коммерческого использования',
    subtitle: '1990-2000-е',
    type: 'expansion',
    gradient: 'from-secondary to-primary',
    directions: [
      { name: 'Поисковые системы', examples: 'Google (1998), Yandex (1997)', icon: 'Search' },
      { name: 'Социальные сети', examples: 'Facebook, ВКонтакте', icon: 'Users' },
      { name: 'Электронная коммерция', examples: 'Amazon, AliExpress', icon: 'ShoppingCart' },
      { name: 'Электронная почта', examples: 'Стандарт деловой переписки', icon: 'Mail' }
    ]
  },
  {
    id: 7,
    title: 'Связь теории с подготовкой к экзаменам',
    subtitle: 'Подготовка к ОГЭ',
    type: 'practice',
    gradient: 'from-accent to-secondary',
    example: 'Что такое гиперссылка?',
    levels: [
      { level: 'Простое определение', desc: 'Средство навигации' },
      { level: 'Глубокое понимание', desc: 'Техническая реализация идеи гипертекста' },
      { level: 'Системное понимание', desc: 'Основа архитектуры WWW' }
    ]
  },
  {
    id: 8,
    title: 'Что я научился делать?',
    subtitle: 'Цифровые навыки и компетенции',
    type: 'skills',
    gradient: 'from-primary to-secondary',
    skillGroups: [
      {
        title: 'Анализ URL-адресов',
        icon: 'Link',
        skills: ['Структура: протокол://домен/путь', 'Безопасность: HTTPS vs HTTP']
      },
      {
        title: 'Работа с электронной почтой',
        icon: 'Mail',
        skills: ['Клиенты: Outlook, Thunderbird', 'Прикрепление файлов', 'Организация переписки']
      },
      {
        title: 'Критическая оценка информации',
        icon: 'Shield',
        skills: ['Проверка источников', 'Анализ достоверности']
      }
    ]
  },
  {
    id: 9,
    title: 'Результаты опроса',
    subtitle: '50 учеников 9-х классов',
    type: 'research',
    gradient: 'from-secondary to-accent',
    data: [
      { percent: 92, label: 'Ежедневно используют Интернет для учёбы' },
      { percent: 68, label: 'Не знали об ARPANET до проекта' },
      { percent: 45, label: 'Имели трудности с заданиями по гиперссылкам' },
      { percent: 85, label: 'Улучшили понимание после изучения материалов' }
    ],
    conclusion: 'Существует разрыв между использованием и пониманием Интернета'
  },
  {
    id: 10,
    title: 'Что я понял в результате работы?',
    subtitle: 'Основные выводы проекта',
    type: 'conclusions',
    gradient: 'from-accent to-primary',
    conclusions: [
      { icon: 'History', title: 'Исторический', text: 'Развитие — цепь последовательных открытий' },
      { icon: 'Cpu', title: 'Технологический', text: 'Понимание TCP/IP и WWW — ключ к грамотному использованию' },
      { icon: 'GraduationCap', title: 'Образовательный', text: 'Знания об Интернете делают подготовку к ОГЭ осмысленнее' },
      { icon: 'Globe', title: 'Социальный', text: 'Интернет изменил способы коммуникации и устройство общества' }
    ]
  },
  {
    id: 11,
    title: 'Интернет — больше чем технология',
    type: 'final',
    gradient: 'from-primary via-secondary to-accent',
    theses: [
      'История изобретательности — от военных разработок к глобальной системе знаний',
      'Инструмент образования — требующий понимания для эффективного использования',
      'Среда для развития — предполагающая ответственность и цифровую грамотность'
    ],
    quote: 'Чтобы уверенно чувствовать себя в цифровом мире, нужно понимать, что стоит за технологиями'
  }
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`min-h-[80vh] bg-gradient-to-br ${slide.gradient} rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 animate-fade-in`}>
          {slide.type === 'title' && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-scale-in">
                  {slide.title}
                </h1>
                <p className="text-2xl md:text-3xl text-white/90">{slide.subtitle}</p>
              </div>
              <div className="mt-12 space-y-2 text-white/80 text-lg">
                <p>ФИО автора</p>
                <p>Класс, школа</p>
                <p>Учебный год 2024/2025</p>
              </div>
              <div className="mt-8">
                <Icon name="Globe" size={120} className="text-white/30" />
              </div>
            </div>
          )}

          {slide.type === 'content' && (
            <div className="space-y-8 text-white">
              <h2 className="text-4xl md:text-5xl font-bold animate-slide-in">{slide.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {slide.stats?.map((stat, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:scale-105 transition-transform">
                    <div className="flex items-start gap-4">
                      <Icon name={stat.icon} size={40} className="text-white" />
                      <div>
                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                        <div className="text-white/90">{stat.label}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-white/15 backdrop-blur-lg border-white/30 p-8 mt-8">
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-3">
                  <Icon name="Target" size={28} />
                  Цель проекта
                </h3>
                <p className="text-xl text-white/95">{slide.goal}</p>
              </Card>
            </div>
          )}

          {slide.type === 'timeline' && (
            <div className="space-y-8 text-white">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold animate-slide-in">{slide.title}</h2>
                <p className="text-2xl mt-2 text-white/90">{slide.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {slide.facts?.map((fact, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                    <div className="flex items-start gap-4">
                      <Icon name={fact.icon} size={32} className="text-white flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-lg mb-1">{fact.label}</div>
                        <div className="text-white/90">{fact.value}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-white/15 backdrop-blur-lg border-white/30 p-8 mt-8">
                <h3 className="text-xl font-semibold mb-4">Первые 4 узла сети:</h3>
                <div className="flex flex-wrap gap-4">
                  {slide.nodes?.map((node, index) => (
                    <div key={index} className="bg-white/20 px-6 py-3 rounded-full text-lg font-medium">
                      {node}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {slide.type === 'tech' && (
            <div className="space-y-8 text-white">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold animate-slide-in">{slide.title}</h2>
                <p className="text-2xl mt-2 text-white/90">{slide.subtitle}</p>
                <p className="text-xl mt-4 text-white/80">Разработчики: {slide.authors}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {slide.concepts?.map((concept, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 p-8">
                    <Icon name={concept.icon} size={48} className="mb-4" />
                    <div className="text-3xl font-bold mb-3">{concept.term}</div>
                    <div className="text-xl text-white/90">{concept.description}</div>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-white/15 backdrop-blur-lg border-white/30 p-8 mt-8">
                <div className="flex items-center gap-4 mb-4">
                  <Icon name="Calendar" size={32} />
                  <h3 className="text-2xl font-bold">Ключевая дата</h3>
                </div>
                <p className="text-xl mb-6">{slide.milestone}</p>
                <div className="flex items-center gap-4">
                  <Icon name="CheckCircle" size={32} />
                  <p className="text-xl font-semibold">{slide.result}</p>
                </div>
              </Card>
            </div>
          )}

          {slide.type === 'invention' && (
            <div className="space-y-8 text-white">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold animate-slide-in">{slide.title}</h2>
                <p className="text-2xl mt-2 text-white/90">{slide.subtitle}</p>
                <p className="text-xl mt-4 text-white/80">{slide.inventor}</p>
              </div>
              
              <Card className="bg-white/15 backdrop-blur-lg border-white/30 p-8">
                <h3 className="text-2xl font-bold mb-6">Три ключевых изобретения</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {slide.inventions?.map((invention, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <Icon name={invention.icon} size={40} />
                      </div>
                      <div className="text-2xl font-bold mb-2">{invention.name}</div>
                      <div className="text-white/90">{invention.description}</div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="FileText" size={28} />
                    <h3 className="text-xl font-semibold">Концепция</h3>
                  </div>
                  <p className="text-lg">{slide.concept}</p>
                </Card>
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="Globe" size={28} />
                    <h3 className="text-xl font-semibold">Первый сайт</h3>
                  </div>
                  <p className="text-lg font-mono">{slide.firstSite}</p>
                </Card>
              </div>
            </div>
          )}

          {slide.type === 'expansion' && (
            <div className="space-y-8 text-white">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold animate-slide-in">{slide.title}</h2>
                <p className="text-2xl mt-2 text-white/90">{slide.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {slide.directions?.map((direction, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 p-8 hover:scale-105 transition-transform">
                    <Icon name={direction.icon} size={48} className="mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{direction.name}</h3>
                    <p className="text-lg text-white/90">{direction.examples}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {slide.type === 'practice' && (
            <div className="space-y-8 text-white">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold animate-slide-in">{slide.title}</h2>
                <p className="text-2xl mt-2 text-white/90">{slide.subtitle}</p>
              </div>
              
              <Card className="bg-white/15 backdrop-blur-lg border-white/30 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Icon name="FileQuestion" size={36} />
                  <h3 className="text-2xl font-bold">Пример задания №7 ОГЭ</h3>
                </div>
                <p className="text-3xl font-semibold mb-8 text-center py-4 bg-white/10 rounded-lg">
                  {slide.example}
                </p>
                <h4 className="text-xl font-bold mb-4">Три уровня понимания:</h4>
                <div className="space-y-4">
                  {slide.levels?.map((level, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white/10 p-6 rounded-xl">
                      <div className="bg-white/30 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-xl font-semibold mb-1">{level.level}</div>
                        <div className="text-white/90">{level.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {slide.type === 'skills' && (
            <div className="space-y-8 text-white">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold animate-slide-in">{slide.title}</h2>
                <p className="text-2xl mt-2 text-white/90">{slide.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {slide.skillGroups?.map((group, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon name={group.icon} size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-center">{group.title}</h3>
                    <ul className="space-y-2">
                      {group.skills.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="flex-shrink-0 mt-0.5" />
                          <span className="text-white/90">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {slide.type === 'research' && (
            <div className="space-y-8 text-white">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold animate-slide-in">{slide.title}</h2>
                <p className="text-2xl mt-2 text-white/90">{slide.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {slide.data?.map((item, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 p-8 hover:scale-105 transition-transform">
                    <div className="text-6xl font-bold mb-4 text-center bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                      {item.percent}%
                    </div>
                    <p className="text-lg text-center text-white/90">{item.label}</p>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-white/15 backdrop-blur-lg border-white/30 p-8 mt-8">
                <div className="flex items-center gap-4">
                  <Icon name="Lightbulb" size={32} />
                  <h3 className="text-2xl font-bold">Вывод</h3>
                </div>
                <p className="text-xl mt-4 text-white/95">{slide.conclusion}</p>
              </Card>
            </div>
          )}

          {slide.type === 'conclusions' && (
            <div className="space-y-8 text-white">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold animate-slide-in">{slide.title}</h2>
                <p className="text-2xl mt-2 text-white/90">{slide.subtitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {slide.conclusions?.map((conclusion, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 p-8">
                    <Icon name={conclusion.icon} size={48} className="mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{conclusion.title}</h3>
                    <p className="text-lg text-white/90">{conclusion.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {slide.type === 'final' && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 text-white">
              <h2 className="text-4xl md:text-6xl font-bold animate-scale-in">{slide.title}</h2>
              
              <div className="max-w-3xl space-y-6 mt-8">
                {slide.theses?.map((thesis, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 p-6 text-left">
                    <div className="flex items-start gap-4">
                      <div className="bg-white/30 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <p className="text-lg">{thesis}</p>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-white/20 backdrop-blur-lg border-white/30 p-8 mt-8 max-w-3xl">
                <Icon name="Quote" size={40} className="mb-4 mx-auto opacity-50" />
                <p className="text-2xl font-semibold italic">{slide.quote}</p>
              </Card>
              
              <div className="mt-12">
                <h3 className="text-3xl font-bold mb-4">Спасибо за внимание!</h3>
                <p className="text-xl text-white/80">Готов ответить на ваши вопросы</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-8">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            size="lg"
            className="bg-white/80 hover:bg-white"
          >
            <Icon name="ChevronLeft" size={24} />
            Назад
          </Button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            variant="outline"
            size="lg"
            className="bg-white/80 hover:bg-white"
          >
            Вперёд
            <Icon name="ChevronRight" size={24} />
          </Button>
        </div>

        <div className="text-center mt-4 text-gray-600">
          Слайд {currentSlide + 1} из {slides.length}
        </div>
      </div>
    </div>
  );
}
