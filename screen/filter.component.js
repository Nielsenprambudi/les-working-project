import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  Spinner,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import filterAction from './../redux/actions/filter';
const global = require('../styles/global');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const FilterScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {
    isLoadingCurriculum,
    isErrorCurriculum,
    isCurriculum,
    curriculums,
    isLoadingGradeSubject,
    isErrorGradesubject,
    isGradesubject,
    grades,
    subjects,
  } = useSelector(state => state.filter);
  const {typeParam} = route.params;
  const [tutorName, setTutorName] = useState('');
  const [dataCurriculum, setDataCurriculum] = useState([]);
  const [curriculumId, setCurriculumId] = useState('');
  const [curriculumName, setCurriculumName] = useState('');
  const [dataGradesGroups, setDataGradesGroups] = useState([]);
  const [gradeGroupId, setGradeGroupId] = useState('');
  const [gradeGroupName, setGradeGroupName] = useState('');
  const [dataGradesFilter, setDataGradesFilter] = useState([]);
  const [dataGrades, setDataGrades] = useState([]);
  const [gradeId, setGradeId] = useState('');
  const [gradeName, setGradeName] = useState('');
  const [dataSubjects, setDataSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackIcon = props => (
    <Icon {...props} name="arrow-back" fill="#FFFFFF" />
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const ResetAction = () => (
    <TouchableOpacity onPress={() => resetFilter()}>
      <Text category="c1" style={[global.captionFont, {color: '#FFFFFF'}]}>
        Reset Filter
      </Text>
    </TouchableOpacity>
  );

  const resetFilter = () => {
    dispatch(filterAction.clear());
    dispatch(filterAction.clearGradeSubject);
    setTutorName('');
    setDataCurriculum([]);
    setCurriculumId('');
    setCurriculumName('');
    setDataGradesGroups([]);
    setGradeGroupId('');
    setGradeGroupName('');
    setDataGradesFilter([]);
    setDataGrades([]);
    setGradeId('');
    setGradeName('');
    setDataSubjects([]);
    setSubjectId('');
    setSubjectName('');
  };

  const RenderItem = (item, index) => (
    <AutocompleteItem key={index} title={item.curriculumName} />
  );
  const RenderItemSubject = (item, index) => (
    <AutocompleteItem key={index} title={item.subjectName} />
  );
  const RenderItemGradeGroup = (item, index) => (
    <AutocompleteItem key={index} title={item.gradeGroupName} />
  );
  const RenderItemGrade = (item, index) => (
    <AutocompleteItem key={index} title={item.gradeName} />
  );

  const filterCur = (item, query) =>
    item.curriculumName.toLowerCase().includes(query.toLowerCase());
  const filterSub = (item, query) =>
    item.subjectName.toLowerCase().includes(query.toLowerCase());
  const filterGradeGroup = (item, query) =>
    item.gradeGroupName.toLowerCase().includes(query.toLowerCase());
  const filterGrade = (item, query) =>
    item.gradeName.toLowerCase().includes(query.toLowerCase());

  const onChangeCur = e => {
    setCurriculumName(e);
    if (e != '') {
      setDataCurriculum(dataCurriculum.filter(item => filterCur(item, e)));
    } else {
      setDataCurriculum(curriculums);
    }
  };

  const onSelectedCur = i => {
    let arrCur = curriculums[i];
    setCurriculumName(arrCur.curriculumName);
    setCurriculumId(arrCur.id);
    dispatch(filterAction.getGradeSubject({curriculum: arrCur.id}));
  };

  const onChangeSubject = e => {
    setSubjectName(e);
    if (e != '') {
      setDataSubjects(dataSubjects.filter(item => filterSub(item, e)));
    } else {
      setDataSubjects(subjects);
    }
  };

  const onSelectedSub = i => {
    let arrSub = subjects[i];
    setSubjectName(arrSub.subjectName);
    setSubjectId(arrSub.id);
  };

  const onChangeGradeGroup = e => {
    setGradeGroupName(e);
    if (e != '') {
      setDataGradesGroups(
        dataGradesGroups.filter(item => filterGradeGroup(item, e)),
      );
    } else {
      setDataGradesGroups(grades);
    }
  };

  const onSelectedGradeGroup = i => {
    let arrGg = grades[i];
    setGradeGroupName(arrGg.gradeGroupName);
    setGradeGroupId(arrGg.gradeGroupId);
    setDataGrades(arrGg?.grades);
    setDataGradesFilter(arrGg?.grades);
  };

  const onChangeGrade = e => {
    setGradeName(e);
    if (e != '') {
      setDataGrades(dataGrades.filter(item => filterGrade(item, e)));
    } else {
      setDataGrades(dataGradesFilter);
    }
  };

  const onSelectedGrade = i => {
    let arrGg = dataGradesFilter[i];
    setGradeName(arrGg.gradeName);
    setGradeId(arrGg.gradeId);
  };

  const search = () => {
    navigation.navigate('FilterLes', {
      qsearch: tutorName,
      typeParam: typeParam,
      qcurricullum: curriculumId,
      qgrade: gradeId != '' ? gradeId : gradeGroupId,
      qsubject: subjectId,
    });
  };

  useEffect(() => {
    dispatch(filterAction.getCurriculum());
  }, [dispatch]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ScrollView>
        <TopNavigation
          accessoryLeft={BackAction}
          accessoryRight={ResetAction}
          title={evaprops => (
            <Text
              {...evaprops}
              category="h5"
              style={[global.normalFont, {color: '#FFFFFF'}]}>
              Filter
            </Text>
          )}
          style={{backgroundColor: '#193c58'}}
        />
        <Layout style={{marginTop: width * 0.05}}>
          <Input
            placeholder="Tulis Nama Tutor Disini"
            label={evaprops => (
              <Text {...evaprops} category="p1" style={[global.normalFont]}>
                Nama Tutor (Opsional)
              </Text>
            )}
            style={global.inputStyle}
            textStyle={global.normalFont}
            value={tutorName}
            onChangeText={e => setTutorName(e)}
          />

          {isLoadingCurriculum ? (
            <Layout
              style={{
                marginHorizontal: width * 0.45,
                marginVertical: width * 0.2,
              }}>
              <Spinner size="large" animating="true" />
            </Layout>
          ) : (
            <Autocomplete
              placeholder="Pilih Kurikulum"
              label={evaprops => (
                <Text {...evaprops} category="p1" style={[global.normalFont]}>
                  Kurikulum
                </Text>
              )}
              style={global.inputStyle}
              value={curriculumName}
              onFocus={() => setDataCurriculum(curriculums)}
              onSelect={index => onSelectedCur(index)}
              onChangeText={e => onChangeCur(e)}>
              {dataCurriculum.map(RenderItem)}
            </Autocomplete>
          )}
          {isLoadingGradeSubject ? (
            <Layout
              style={{
                marginHorizontal: width * 0.45,
                marginVertical: width * 0.2,
              }}>
              <Spinner size="large" animating="true" />
            </Layout>
          ) : (
            <Autocomplete
              placeholder="Pilih Mata Pelajaran"
              label={evaprops => (
                <Text {...evaprops} category="p1" style={[global.normalFont]}>
                  Mata Pelajaran
                </Text>
              )}
              disabled={curriculumId == ''}
              style={global.inputStyle}
              value={subjectName}
              onFocus={() => setDataSubjects(subjects)}
              onSelect={index => onSelectedSub(index)}
              onChangeText={e => onChangeSubject(e)}>
              {dataSubjects.map(RenderItemSubject)}
            </Autocomplete>
          )}
          {isLoadingGradeSubject ? (
            <Layout
              style={{
                marginHorizontal: width * 0.45,
                marginVertical: width * 0.2,
              }}>
              <Spinner size="large" animating="true" />
            </Layout>
          ) : (
            <Autocomplete
              placeholder="Pilih Grup Kelas"
              label={evaprops => (
                <Text {...evaprops} category="p1" style={[global.normalFont]}>
                  Grup Kelas
                </Text>
              )}
              disabled={curriculumId == ''}
              style={global.inputStyle}
              value={gradeGroupName}
              onFocus={() => setDataGradesGroups(grades)}
              onSelect={index => onSelectedGradeGroup(index)}
              onChangeText={e => onChangeGradeGroup(e)}>
              {dataGradesGroups.map(RenderItemGradeGroup)}
            </Autocomplete>
          )}
          {dataGrades.length > 0 && (
            <Autocomplete
              placeholder="Pilih Kelas"
              label={evaprops => (
                <Text {...evaprops} category="p1" style={[global.normalFont]}>
                  Kelas (opsional)
                </Text>
              )}
              disabled={curriculumId == ''}
              style={global.inputStyle}
              value={gradeName}
              onSelect={index => onSelectedGrade(index)}
              onChangeText={e => onChangeGrade(e)}>
              {dataGrades.map(RenderItemGrade)}
            </Autocomplete>
          )}

          <Button
            size="small"
            style={[
              global.defaultButton,
              {
                marginHorizontal: width * 0.25,
                marginVertical: width * 0.05,
              },
            ]}
            activeOpacity={0.2}
            onPress={() => search()}>
            {evaprops => (
              <Text
                {...evaprops}
                style={(global.normalFont, {color: '#FFFFFF'})}>
                Cari
              </Text>
            )}
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};
