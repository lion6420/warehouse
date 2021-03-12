<template>
  <div :class="$style.stock_adjust">
    <!--first column-->
    <div :class="$style.stock_col" pos="left">
      <!--header-->
      <div :class="$style.stock_row">
        <div :class="$style.shelf_set" v-for="(shelf, sh_index) in 7" :key="sh_index">
          <shelf></shelf>
        </div>
      </div>
      <!--16 rows 貨架非暫存區-->
      <div :class="$style.stock_row" v-for="(row_num, row_index) in 16" :key="row_index"
        :style="{
          'margin-top':row_index === 0 ? '30px':'17px',
        }">
        <div :class="$style.shelf_set" v-for="(shelf, sh_index) in 7" :key="sh_index">
          <shelf style="margin-bottom:3px;" v-if="row_index == 7 && sh_index == 5 ? false:true" :label="sh_index === 6 ? getLabel_shelf(row_index, 0):''"></shelf>
          <shelf v-if="row_index == 7 && sh_index == 5 ? false:true" :label="sh_index === 6 ? getLabel_shelf(row_index, 0):''"></shelf>
        </div>
      </div>
    </div>

     <!--snd column-->
    <div :class="$style.stock_col" pos="mid">
      <!--header-->
      <div :class="$style.stock_row">
        <div :class="$style.shelf_set" v-for="(shelf, sh_index) in 7" :key="sh_index">
          <shelf></shelf>
        </div>
      </div>
      <!--3 rows 貨架暫存區-->
      <div>
        <div :class="$style.stock_row" v-for="(row_num, row_index) in 3" :key="row_index"
          :style="{
            'margin-top':row_index === 0 ? '30px':'17px',
          }">
          <div :class="$style.shelf_set" v-for="(shelf, sh_index) in 7" :key="sh_index">
            <shelf style="margin-bottom:3px"></shelf>
            <shelf></shelf>
          </div>
        </div>
      </div>
      <!--4 rows 周轉車-->
      <div>
      <div :class="$style.stock_row" v-for="(row_num, row_index) in 4" :key="row_index" style="margin-top:23px">
        <div v-if="row_index == 2" style="display:flex;width:100%">
          <div :class="$style.others_set" v-for="(other, oth_index) in 9" :key="oth_index">
            <!--備料車-->
            <div v-if="oth_index == 6" style="width:30px;height:102px; border: 1px #fff solid; writing-mode:vertical-lr; color:#fff;margin-left:1px">
              <span style="padding:20px;font-size:20px">備料車</span>  
            </div>
            <others v-else-if="oth_index != 7"></others>
            <others v-if="oth_index != 7 && oth_index != 6"></others>
          </div>
        </div>

        <div v-else style="display:flex; width:100%">
          <div :class="$style.others_set" v-for="(other, oth_index) in 9" :key="oth_index">
            <others></others>
            <others></others>
          </div>
        </div>
      </div>
      </div>
      <!--5 rows 貨架暫存區-->
      <div :class="$style.stock_row" v-for="(row_num, row_index) in 5" :key="row_index"
        :style="{
          'margin-top':row_index === 0 ? '23px':'17px',
        }">
        <div :class="$style.shelf_set" v-for="(shelf, sh_index) in 7" :key="sh_index">
          <shelf style="margin-bottom:3px"></shelf>
          <shelf></shelf>
        </div>
      </div>
    </div>

     <!--trd column-->
    <div :class="$style.stock_col" pos="right">
      <!--header-->
      <div :class="$style.stock_row">
        <div :class="$style.trailer_set">
          <trailer v-for="(trailer, tra_index) in 3" :key="tra_index"></trailer>
        </div>
      </div>
      <div :class="$style.stock_row" v-for="(row_num, row_index) in 25" :key="row_index"
        :style="{
          'margin-top':row_index === 0 ? '27px':'18px',
        }">
        <div :class="$style.trailer_set">
          <trailer v-for="(trailer, tra_index) in 3" :key="tra_index" :label="getLabel_trailer(row_index)"></trailer>
        </div>
      </div>
      <!--footer-->
      <div :class="$style.stock_row" style="margin-top:40px">
        <div style="display:flex;justify-content: flex-start">
          <div style="color:#fff; width:100px; border:1px #fff solid; text-align:center">辦公</div>
          <div style="color:#fff; width:100px; border:1px #fff solid; text-align:center">辦公</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shelf from './stock-shelf'
import others from './stock-others'
import trailer from './stock-trailer'
export default {
  components: {
    shelf,
    others,
    trailer
  },
  data() {
    return {}
  },
  methods: {
    getLabel_shelf(row, index) {
      let label = ''
      switch (row) {
        case 0:
          label = 'K'
          break
        case 1:
          if (index == 0) label = 'K'
          else label = 'MSD'
          break
        case 2:
          label = 'MSD'
          break
        case 3:
          if (index == 0) label = 'MSD'
          else label = 'I'
          break
        case 4:
          if (index == 0) label = 'I'
          else label = 'J'
          break
        case 5:
          if (index == 0) label = 'J'
          else label = 'O'
          break
        case 6:
          if (index == 0) label = 'O'
          else label = 'H'
          break
        case 7:
          if (index == 0) label = 'H'
          else label = 'G'
          break
        case 8:
          if (index == 0) label = 'G'
          else label = 'FZ'
          break
        case 9:
          if (index == 0) label = 'FZ'
          else label = 'L'
          break
        case 10:
          label = 'L'
          break
        case 11:
          if (index == 0) label = 'L'
          else label = 'M'
          break
        case 12:
          label = 'M'
          break
        case 13:
          if (index == 0) label = 'M'
          else label = 'FC'
          break
        case 14:
          label = 'FC'
          break
        case 15:
          label = 'FC'
          break
      }
      return label
    },
    getLabel_trailer(row) {
      let label = ''
      switch(row) {
        case 0:
          label = 'A'
          break
        case 1:
          label = 'A'
          break
        case 2:
          label = 'B'
          break
        case 3:
          label = 'B'
          break
        case 4:
          label = 'C'
          break
        case 5:
          label = 'C'
          break
        case 6:
          label = 'D'
          break
        case 7:
          label = 'D'
          break
        case 8:
          label = 'R'
          break
        case 9:
          label = 'Q'
          break
        case 10:
          label = 'P'
          break
        case 11:
          label = 'G'
          break
        case 12:
          label = 'E'
          break
        case 13:
          label = 'E'
          break
        case 14:
          label = 'F'
          break
        case 15:
          label = 'F'
          break
        case 16:
          label = 'FZ'
          break
        case 17:
          label = 'FC'
          break
        case 18:
          label = 'Z'
          break
        case 19:
          label = 'Z'
          break
        case 20:
          label = 'Z'
          break
        case 21:
          label = 'Y'
          break
        case 22:
          label = 'Y'
          break
        case 23:
          label = 'X'
          break
        case 24:
          label = 'X'
          break
      }
      return label
    }
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';
.stock_adjust {
  @include block(95%);
  @include border();
  display: flex;
  justify-content: space-between;
  margin:auto;
  margin-top:20px;
  margin-bottom:20px;
  .stock_col[pos=left] {
    @include block(33%);
    .stock_row {
      @include block(100%);
      display: flex;
      .shelf_set {
        @include block(100%);
        justify-content: center;
      }
    }
  }
  .stock_col[pos=mid] {
    @include block(33%);
    .stock_row {
      @include block(100%);
      display: flex;
      .shelf_set {
        @include block(100%);
        justify-content: center;
      }
      .others_set {
        @include block(100%);
        justify-content: center;
      }
    }
  }
  .stock_col[pos=right] {
    @include block(24%);
    .stock_row {
      @include block(100%);
      .trailer_set {
        @include block(100%);
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>