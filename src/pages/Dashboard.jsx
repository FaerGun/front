import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Dashboard = () => {
  // Моковые данные для диаграммы
  const pieData = [
    { title: 'Успешные', value: 60, color: '#4CAF50' },
    { title: 'Пропущенные', value: 25, color: '#FFC107' },
    { title: 'Неуспешные', value: 15, color: '#FF5252' },
  ];

  // Моковые данные для тем
  const bestTopics = [
    { name: 'JavaScript', progress: 85 },
    { name: 'React', progress: 78 },
    { name: 'Node.js', progress: 72 },
  ];

  const worstTopics = [
    { name: 'TypeScript', progress: 45 },
    { name: 'Python', progress: 38 },
    { name: 'Java', progress: 30 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Блок с круговой диаграммой */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl mb-4">Стата общая по собесам</h2>
          <div className="w-64 h-64 mx-auto">
            <PieChart
              data={pieData}
              lineWidth={20}
              paddingAngle={2}
              rounded
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
              labelStyle={{
                fontSize: '8px',
                fontFamily: 'sans-serif',
                fill: '#fff',
              }}
              labelPosition={70}
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#4CAF50]"></div>
              <span>Процент успешных прохождений</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FFC107]"></div>
              <span>Процент пропущенных заданий</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FF5252]"></div>
              <span>Процент неуспешных заданий</span>
            </div>
          </div>
        </div>

        {/* Блоки с темами */}
        <div className="flex flex-col gap-8">
          {/* Лучшие темы */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl mb-4">Стата по темам которые получаются лучше всего</h2>
            <div className="flex flex-col gap-4">
              {bestTopics.map((topic, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{topic.name}</span>
                    <span>{topic.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-[#B3DB32] h-2 rounded-full"
                      style={{ width: `${topic.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Худшие темы */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl mb-4">Стата по темам которые хуевые</h2>
            <div className="flex flex-col gap-4">
              {worstTopics.map((topic, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{topic.name}</span>
                    <span>{topic.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-[#FF5252] h-2 rounded-full"
                      style={{ width: `${topic.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;