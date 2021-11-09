<template>
  <div class="form" ref="form">
    <div class="form__section">
      <p class="form__section__title">Личные данные</p>
      <div class="form__row w-33">
        <label class="form__label">
          <span>Имя</span>
          <input type="text" class="form__input" v-model="formData.name" @input="validateRu" />
        </label>
      </div>
      <div class="form__row w-33">
        <label class="form__label">
          <span>Фамилия</span>
          <input type="text" class="form__input" v-model="formData.surname" @input="validateRu" />
        </label>
      </div>
      <div class="form__row w-33">
        <label class="form__label">
          <span>Отчество</span>
          <input
            type="text"
            class="form__input"
            v-model="formData.patronymic"
            @input="validateRu"
          />
        </label>
      </div>
      <div class="form__row w-50">
        <label class="form__label">
          <span>Дата рождения</span>
          <input
            type="text"
            class="form__input"
            v-model="formData.dob"
            placeholder="дд.мм.гг"
            @input="validateDate"
          />
        </label>
      </div>
      <div class="form__row w-50">
        <label class="form__label">
          <span>Email</span>
          <input type="text" class="form__input" v-model="formData.email" @input="validateEmail" />
        </label>
      </div>
    </div>
    <div class="form__section">
      <p class="form__section__title">Пол</p>
      <div class="form__row w-100 d-flex">
        <label class="form__label form__label_radio">
          <input type="radio" name="gender" value="man" v-model="formData.gender" />
          <span>Мужской</span>
        </label>
        <label class="form__label form__label_radio">
          <input type="radio" name="gender" value="woman" v-model="formData.gender" />
          <span>Женский</span>
        </label>
      </div>
    </div>
    <div class="form__section">
      <p class="form__section__title">Паспортные данные</p>
      <div class="form__row w-100">
        <label class="form__label">
          <span>Гражданство</span>
          <input type="text" v-model="filter" class="form__input" />
          <select
            type="text"
            class="form__input form__select"
            v-model="formData.citizenship"
            @change="changeCitizenship"
          >
            <option v-for="c in filteredCitizenships" :key="c.uid" :value="c.id">
              {{ c.nationality }}
            </option>
          </select>
        </label>
      </div>
      <div class="form__row w-33" v-if="isRussian">
        <label class="form__label">
          <span>Серия паспорта</span>
          <input
            type="text"
            class="form__input"
            v-model="formData.passportSeries"
            @input="validatePassport($event, 4)"
          />
        </label>
      </div>
      <div class="form__row w-33" v-if="isRussian">
        <label class="form__label">
          <span>Номер паспорта</span>
          <input
            type="text"
            class="form__input"
            v-model="formData.passportID"
            @input="validatePassport($event, 6)"
          />
        </label>
      </div>
      <div class="form__row w-33" v-if="isRussian">
        <label class="form__label">
          <span>Дата выдачи</span>
          <input type="text" class="form__input" v-model="formData.passportDate" />
        </label>
      </div>
      <div class="form__row w-50" v-if="!isRussian">
        <label class="form__label">
          <span>Фамилия на латинице</span>
          <input
            type="text"
            class="form__input"
            v-model="formData.foreignSurname"
            @input="validateEn"
          />
        </label>
      </div>
      <div class="form__row w-50" v-if="!isRussian">
        <label class="form__label">
          <span>Имя на латинице</span>
          <input
            type="text"
            class="form__input"
            v-model="formData.foreignName"
            @input="validateEn"
          />
        </label>
      </div>
      <div class="form__row w-33" v-if="!isRussian">
        <label class="form__label">
          <span>Номер паспорта</span>
          <input
            type="text"
            class="form__input"
            v-model="formData.foreignPassportID"
            @input="validatePassport"
          />
        </label>
      </div>
      <div class="form__row w-33" v-if="!isRussian">
        <label class="form__label">
          <span>Страна выдачи</span>
          <select
            type="text"
            class="form__input form__select"
            v-model="formData.foreignPassportCountry"
          >
            <option v-for="c in citizenships" :key="c.uid" :value="c.id">
              {{ c.nationality }}
            </option>
          </select>
        </label>
      </div>
      <div class="form__row w-33" v-if="!isRussian">
        <label class="form__label">
          <span>Тип паспорта</span>
          <select
            type="text"
            class="form__input form__select"
            v-model="formData.foreignPassportType"
          >
            <option v-for="p in passportTypes" :key="p.id" :value="p.id">
              {{ p.type }}
            </option>
          </select>
        </label>
      </div>
    </div>
    <div class="form__section">
      <p class="form__section__title">Меняли ли фамилию или имя</p>
      <div class="form__row w-100 d-flex">
        <label class="form__label form__label_radio">
          <input
            type="radio"
            name="isNameSurnameChanged"
            value="false"
            v-model="formData.isNameSurnameChanged"
          />
          <span>Нет</span>
        </label>
        <label class="form__label form__label_radio">
          <input
            type="radio"
            name="isNameSurnameChanged"
            value="true"
            v-model="formData.isNameSurnameChanged"
          />
          <span>Да</span>
        </label>
      </div>
      <div class="form__row w-50" v-if="isPreviousNameSurname">
        <label class="form__label">
          <span>Предыдущая Фамилия</span>
          <input
            type="text"
            class="form__input"
            v-model="formData.previousSurname"
            @input="validateRu"
          />
        </label>
      </div>
      <div class="form__row w-50" v-if="isPreviousNameSurname">
        <label class="form__label">
          <span>Предыдущее Имя</span>
          <input
            type="text"
            class="form__input"
            v-model="formData.previousName"
            @input="validateRu"
          />
        </label>
      </div>
    </div>
    <div class="form__row w-100">
      <button @click="sendData" class="form__submit">Отправить</button>
    </div>
  </div>
</template>

<script>
import citizenships from "@/assets/data/citizenships.json";
import passportTypes from "@/assets/data/passport-types.json";
import { debounce, ruRegexp, enRegexp, dateRegexp, emailRegexp, numbersRegexp } from "./helpers.js";

export default {
  data() {
    return {
      citizenships: citizenships,
      passportTypes: passportTypes,
      formData: {
        name: null,
        surname: null,
        patronymic: null,
        dob: null,
        email: null,
        gender: "man",
        citizenship: 8604,
        passportSeries: null,
        passportID: null,
        passportDate: null,
        foreignName: null,
        foreignSurname: null,
        foreignPassportID: null,
        foreignPassportCountry: null,
        foreignPassportType: null,
        isNameSurnameChanged: "false",
        previousName: null,
        previousSurname: null,
      },
      passportFields: {
        ru: ["passportSeries", "passportID", "passportDate"],
        fn: [
          "foreignName",
          "foreignSurname",
          "foreignPassportID",
          "foreignPassportCountry",
          "foreignPassportType",
        ],
      },
      previousSelectedCitizenshipRussian: true,
      filteredCitizenships: citizenships,
      filter: "",
      test: null,
    };
  },
  created() {
    this.test = debounce(this.filterCitizenships, 500);
  },
  methods: {
    sendData() {
      if (this.$refs.form.querySelectorAll(".error").length) {
        alert("Исправьте все ошибки!");
        return false;
      }

      console.log(this.formData);
    },

    changeCitizenship() {
      const isRussian = this.formData.citizenship === 8604 ? true : false;

      if (isRussian === this.previousSelectedCitizenshipRussian) {
        return false;
      }

      this.previousSelectedCitizenshipRussian = isRussian;

      this.passportFields[isRussian ? "fn" : "ru"].forEach((field) => {
        this.formData[field] = null;
      });
    },

    filterCitizenships(searchWord) {
      this.filteredCitizenships = this.citizenships.filter((c) =>
        c.nationality.toLowerCase().includes(searchWord.toLowerCase())
      );
    },

    validateRu(e) {
      if (!ruRegexp.test(e.target.value)) {
        if (!e.target.classList.contains("error")) {
          e.target.classList.add("error");
        }
      } else {
        e.target.classList.remove("error");
      }
    },

    validateEn(e) {
      console.log(123);
      if (!enRegexp.test(e.target.value)) {
        if (!e.target.classList.contains("error")) {
          e.target.classList.add("error");
        }
      } else {
        e.target.classList.remove("error");
      }
    },

    validateDate(e) {
      const today = new Date().getTime();
      const value = e.target.value;
      const valueArr = value.split(".");
      const date = new Date(valueArr[2], valueArr[1], valueArr[0]).getTime();

      if (!dateRegexp.test(value) || today - date < 0) {
        if (!e.target.classList.contains("error")) {
          e.target.classList.add("error");
        }
      } else {
        e.target.classList.remove("error");
      }
    },

    validateEmail(e) {
      if (!emailRegexp.test(e.target.value)) {
        if (!e.target.classList.contains("error")) {
          e.target.classList.add("error");
        }
      } else {
        e.target.classList.remove("error");
      }
    },

    validatePassport(e, length = null) {
      const value = e.target.value;

      if ((value.length && !numbersRegexp.test(value)) || (length && value.length > length)) {
        if (!e.target.classList.contains("error")) {
          e.target.classList.add("error");
        }
      } else {
        e.target.classList.remove("error");
      }
    },
  },
  computed: {
    isRussian() {
      return this.formData.citizenship === 8604;
    },
    isPreviousNameSurname() {
      return this.formData.isNameSurnameChanged === "true";
    },
  },
  watch: {
    filter(newValue) {
      this.test(newValue);
    },
  },
};
</script>

<style>
input {
  margin: 0;
}

.d-flex {
  display: flex;
}

.form {
  width: 900px;
  margin: 0 auto;
  font-family: "Arial";
}

.form__section {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.form__section__title {
  width: 100%;
  font-weight: bold;
  padding: 10px;
  padding-right: 10px;
}

.form__row {
  padding: 5px 10px;
}

.form__label span {
  display: block;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
  padding-bottom: 5px;
  font-weight: bold;
}

.form__label_radio {
  display: flex;
  align-items: center;
}

.form__label_radio + .form__label_radio {
  margin-left: 10px;
}

.form__label_radio span {
  padding-bottom: 0;
  margin-left: 5px;
}

.form__input {
  width: 100%;
  height: 36px;
  font-size: 14px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.form__input:focus {
  outline: none;
}

.form__input.error {
  border-color: red;
  box-shadow: 0 0 2px red;
}

.form__submit {
  height: 36px;
  padding: 0 10px;
  background-color: blue;
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.w-33 {
  width: 33.33333%;
}

.w-50 {
  width: 50%;
}

.w-100 {
  width: 100%;
}
</style>
