class XmlExporter {
  constructor(schedules, { lessonQtd, daysQtd }) {
    this.schedules = schedules;
    this.lessonQtd = lessonQtd;
    this.daysQtd = daysQtd;
  }

  export() {
    const map = new Map();

    for (const { available, lesson, dayOfWeek, userName } of this.schedules) {
      const userMap = map.get(userName);

      if (userMap) {
        userMap.push({ available, lesson, dayOfWeek });
        continue;
      }

      map.set(userName, [{ available, lesson, dayOfWeek }]);
    }

    let xml = `<?xml version="1.0" encoding="windows-1252" ?>
    <timetable ascttversion="2023.12.1" importtype="database" displayname="TCC">
        <teachers options="import:disable,canadd,canremove,canupdate,primarytt,silent" columns="name,timeoff">
    `;

    map.forEach((schedules, userName) => {
      let baseDisponibility = [];
      for (let i = 0; i < this.daysQtd; i++) {
        baseDisponibility.push(".");

        for (let j = 0; j < this.lessonQtd; j++) {
          baseDisponibility.push("0");
        }

        if (i != this.daysQtd - 1) baseDisponibility.push(",");
      }

      schedules.forEach(({ available, lesson, dayOfWeek }) => {
        const numberOfDots = dayOfWeek + 1;
        const numberOfCommas = dayOfWeek;
        const numberOfNumbers = dayOfWeek * this.lessonQtd;

        baseDisponibility[
          numberOfDots + numberOfNumbers + lesson + numberOfCommas
        ] = available ? "1" : "0";
      });

      const disponibility = baseDisponibility.join("");

      xml += `<teacher name="${userName}" timeoff="${disponibility}" />`;
    });

    xml += `
      </teachers>
    </timetable>
    `;

    return xml;
  }
}

module.exports = { XmlExporter };
