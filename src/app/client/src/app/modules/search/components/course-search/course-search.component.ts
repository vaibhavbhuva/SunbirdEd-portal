import {
  PaginationService, ResourceService, ConfigService, ToasterService, INoResultMessage,
  ICard, ILoaderMessage, UtilService, BrowserCacheTtlService, NavigationHelperService, IPagination,
  LayoutService, COLUMN_TYPE
} from '@sunbird/shared';
import { SearchService, PlayerService, CoursesService, UserService, FormService, ISort } from '@sunbird/core';
import { combineLatest, Subject, of } from 'rxjs';
import { Component, OnInit, OnDestroy, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash-es';
import { IInteractEventEdata, IImpressionEventInput } from '@sunbird/telemetry';
import { takeUntil, map, mergeMap, first, tap, debounceTime, catchError, delay } from 'rxjs/operators';
import { CacheService } from 'ng2-cache-service';

@Component({
  templateUrl: './course-search.component.html'
})
export class CourseSearchComponent implements OnInit, OnDestroy, AfterViewInit {

  public showLoader = true;
  public showLoginModal = false;
  public baseUrl: string;
  public noResultMessage: INoResultMessage;
  public filterType: string;
  public queryParams: any;
  public unsubscribe$ = new Subject<void>();
  public telemetryImpression: IImpressionEventInput;
  public inViewLogs = [];
  public sortIntractEdata: IInteractEventEdata;
  public dataDrivenFilters: any = {};
  public dataDrivenFilterEvent = new EventEmitter();
  public initFilters = false;
  public facets: Array<string>;
  public facetsList: any;
  public paginationDetails: IPagination;
  public contentList: Array<ICard> = [];
  public cardIntractEdata: IInteractEventEdata;
  public loaderMessage: ILoaderMessage;
  public redirectUrl;
  public frameWorkName: string;
  public closeIntractEdata;
  public enrolledSection;
  public showBatchInfo = false;
  public selectedCourseBatches: any;
  sortingOptions: Array<ISort>;
  public showFilter = true;
  layoutConfiguration;
  FIRST_PANEL_LAYOUT;
  SECOND_PANEL_LAYOUT;
  public totalCount;
  public globalSearchFacets: Array<string>;
  public allTabData;
  public selectedFilters;
  public searchAll;
  public allMimeType;
  // TODO: to rework igot.
  public slugForProminentFilter = (<HTMLInputElement>document.getElementById('slugForProminentFilter')) ?
  (<HTMLInputElement>document.getElementById('slugForProminentFilter')).value : null;
  orgDetailsFromSlug = this.cacheService.get('orgDetailsFromSlug');

  constructor(public searchService: SearchService, public router: Router,
    public activatedRoute: ActivatedRoute, public paginationService: PaginationService,
    public resourceService: ResourceService, public toasterService: ToasterService, public changeDetectorRef: ChangeDetectorRef,
    public configService: ConfigService, public utilService: UtilService, public coursesService: CoursesService,
    private playerService: PlayerService, public userService: UserService, public cacheService: CacheService,
    public formService: FormService, public browserCacheTtlService: BrowserCacheTtlService,
    public navigationhelperService: NavigationHelperService, public layoutService: LayoutService) {
    this.paginationDetails = this.paginationService.getPager(0, 1, this.configService.appConfig.SEARCH.PAGE_LIMIT);
    this.filterType = this.configService.appConfig.courses.filterType;
    this.redirectUrl = this.configService.appConfig.courses.searchPageredirectUrl;
    this.sortingOptions = this.configService.dropDownConfig.FILTER.RESOURCES.sortingOptions;
  }
  ngOnInit() {
    this.searchService.getContentTypes().pipe(takeUntil(this.unsubscribe$)).subscribe(formData => {
      this.allTabData = _.find(formData, (o) => o.title === 'frmelmnts.tab.all');
      this.globalSearchFacets = _.get(this.allTabData, 'search.facets');
      this.setNoResultMessage();
      this.initFilters = true;
    }, error => {
      this.toasterService.error(this.resourceService.frmelmnts.lbl.fetchingContentFailed);
      this.navigationhelperService.goBack();
    });
    this.initLayout();
    combineLatest(this.fetchEnrolledCoursesSection(), this.getFrameWork()).pipe(first(),
      mergeMap((data: Array<any>) => {
        this.enrolledSection = data[0];
        if (data[1]) {
          this.initFilters = true;
          this.frameWorkName = data[1];
          // return this.dataDrivenFilterEvent;
          return of({});
        } else {
          return of({});
        }
    })).subscribe((filters: any) => {
      if (this.userService._isCustodianUser && this.orgDetailsFromSlug ) {
        if (_.get(this.orgDetailsFromSlug, 'slug') === this.slugForProminentFilter) {
          this.showFilter = false;
        }
      }
        this.dataDrivenFilters = filters;
        this.fetchContentOnParamChange();
        this.setNoResultMessage();
      },
      error => {
        this.toasterService.error(this.resourceService.messages.fmsg.m0002);
    });
    this.searchAll = this.resourceService.frmelmnts.lbl.allContent;
  }
  initLayout() {
    this.layoutConfiguration = this.layoutService.initlayoutConfig();
    this.redoLayout();
    this.layoutService.switchableLayout().
        pipe(takeUntil(this.unsubscribe$)).subscribe(layoutConfig => {
        if (layoutConfig != null) {
          this.layoutConfiguration = layoutConfig.layout;
        }
        this.redoLayout();
      });
  }
  redoLayout() {
      if (this.layoutConfiguration != null) {
        this.FIRST_PANEL_LAYOUT = this.layoutService.redoLayoutCSS(0, this.layoutConfiguration, COLUMN_TYPE.threeToNine, true);
        this.SECOND_PANEL_LAYOUT = this.layoutService.redoLayoutCSS(1, this.layoutConfiguration, COLUMN_TYPE.threeToNine, true);
      } else {
        this.FIRST_PANEL_LAYOUT = this.layoutService.redoLayoutCSS(0, null, COLUMN_TYPE.fullLayout);
        this.SECOND_PANEL_LAYOUT = this.layoutService.redoLayoutCSS(1, null, COLUMN_TYPE.fullLayout);
      }
  }
  private fetchContentOnParamChange() {
    combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams)
    .pipe(debounceTime(5), // to sync params and queryParams events
      tap(data => this.inView({inview: []})), // trigger pageexit if last filter resulted 0 contents
      delay(10), // to trigger pageexit telemetry event
      tap(data => {
        this.showLoader = true;
        this.setTelemetryData();
      }),
      map((result) => ({params: { pageNumber: Number(result[0].pageNumber)}, queryParams: result[1]})),
      takeUntil(this.unsubscribe$))
      .subscribe(({params, queryParams}) => {
        this.queryParams = { ...queryParams };
        this.paginationDetails.currentPage = params.pageNumber;
        this.contentList = [];
        this.fetchContents();
      });
  }
  private fetchContents() {
    const selectedMediaType = _.isArray(_.get(this.queryParams, 'mediaType')) ? _.get(this.queryParams, 'mediaType')[0] :
      _.get(this.queryParams, 'mediaType');
    const mimeType = _.find(_.get(this.allTabData, 'search.filters.mimeType'), (o) => {
      return o.name === (selectedMediaType || 'all');
    });
    let filters = _.pickBy(this.queryParams, (value: Array<string> | string) => value && value.length);
    filters = _.omit(filters, ['key', 'sort_by', 'sortType', 'appliedFilters', 'selectedTab', 'mediaType']);
    filters.contentType = filters.contentType || _.get(this.allTabData, 'search.filters.contentType');
    filters.mimeType = _.get(mimeType, 'values');

    // Replacing cbse/ncert value with cbse
    if (_.toLower(_.get(filters, 'board[0]')) === 'cbse/ncert' || _.toLower(_.get(filters, 'board')) === 'cbse/ncert') {
      filters.board = ['cbse'];
    }

    const option = {
      filters: filters,
      fields: _.get(this.allTabData, 'search.fields'),
      limit: _.get(this.allTabData, 'search.limit'),
      pageNumber: this.paginationDetails.currentPage,
      query: this.queryParams.key,
      sort_by: { [this.queryParams.sort_by]: this.queryParams.sortType },
      facets: this.globalSearchFacets,
      params: this.configService.appConfig.Course.contentApiQueryParams
    };
    if (this.frameWorkName) {
      option.params.framework = this.frameWorkName;
    }
    this.searchService.contentSearch(option)
      .subscribe(data => {
        this.showLoader = false;
        this.facets = this.searchService.updateFacetsData(_.get(data, 'result.facets'));
        this.facetsList = this.searchService.processFilterData(_.get(data, 'result.facets'));
        this.paginationDetails = this.paginationService.getPager(data.result.count, this.paginationDetails.currentPage,
          this.configService.appConfig.SEARCH.PAGE_LIMIT);
        const { constantData, metaData, dynamicFields } = this.configService.appConfig.CoursePageSection.course;
        this.contentList = _.map(data.result.content, (content: any) =>
          this.utilService.processContent(content, constantData, dynamicFields, metaData));
          this.totalCount = data.result.count;
      }, err => {
        this.showLoader = false;
        this.contentList = [];
        this.facetsList = [];
        this.totalCount = 0;
        this.paginationDetails = this.paginationService.getPager(0, this.paginationDetails.currentPage,
          this.configService.appConfig.SEARCH.PAGE_LIMIT);
        this.toasterService.error(this.resourceService.messages.fmsg.m0051);
      });

  }
  public getFilters(filters) {
    this.selectedFilters = filters.filters;
    const defaultFilters = _.reduce(filters, (collector: any, element) => {
        if (element.code === 'board') {
          collector.board = _.get(_.orderBy(element.range, ['index'], ['asc']), '[0].name') || '';
        }
        return collector;
      }, {});
    this.dataDrivenFilterEvent.emit(defaultFilters);
  }
  private getFrameWork() {
      const formServiceInputParams = {
        formType: 'framework',
        formAction: 'search',
        contentType: 'framework-code',
      };
      return this.formService.getFormConfig(formServiceInputParams)
        .pipe(map((data) => {
            const frameWork = _.find(data, 'framework').framework;
            return frameWork;
        }), catchError((error) => {
          return of(false);
        }));
  }
  private fetchEnrolledCoursesSection() {
    return this.coursesService.enrolledCourseData$.pipe(map(({enrolledCourses, err}) => {
      const enrolledSection = {
        name: this.resourceService.frmelmnts.lbl.mytrainings,
        length: 0,
        contents: []
      };
      if (err) {
        // show toaster message this.resourceService.messages.fmsg.m0001
        return enrolledSection;
      }
      const { constantData, metaData, dynamicFields, slickSize } = this.configService.appConfig.CoursePageSection.enrolledCourses;
      enrolledSection.contents = this.utilService.getDataForCard(enrolledCourses, constantData, dynamicFields, metaData);
      return enrolledSection;
    }));
  }
  public navigateToPage(page: number): void {
    if (page < 1 || page > this.paginationDetails.totalPages) {
        return;
    }
    const url = this.router.url.split('?')[0].replace(/[^\/]+$/, page.toString());
    this.router.navigate([url], { queryParams: this.queryParams });
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  public playContent({ data }) {
    const { metaData } = data;
    this.changeDetectorRef.detectChanges();
    const {onGoingBatchCount, expiredBatchCount, openBatch, inviteOnlyBatch} = this.coursesService.findEnrolledCourses(metaData.identifier);

    if (!expiredBatchCount && !onGoingBatchCount) { // go to course preview page, if no enrolled batch present
      return this.playerService.playContent(metaData);
    }

    if (onGoingBatchCount === 1) { // play course if only one open batch is present
      metaData.batchId = openBatch.ongoing.length ? openBatch.ongoing[0].batchId : inviteOnlyBatch.ongoing[0].batchId;
      return this.playerService.playContent(metaData);
    }
    this.selectedCourseBatches = { onGoingBatchCount, expiredBatchCount, openBatch, inviteOnlyBatch, courseId: metaData.identifier };
    this.showBatchInfo = true;
  }
  public inView(event) {
    _.forEach(event.inview, (elem, key) => {
        const obj = _.find(this.inViewLogs, { objid: elem.data.metaData.identifier});
        if (!obj) {
            this.inViewLogs.push({
                objid: elem.data.metaData.identifier,
                objtype: elem.data.metaData.contentType || 'content',
                index: elem.id
            });
        }
    });
    if (this.telemetryImpression) {
      this.telemetryImpression.edata.visits = this.inViewLogs;
      this.telemetryImpression.edata.subtype = 'pageexit';
      this.telemetryImpression = Object.assign({}, this.telemetryImpression);
    }
  }
  private setTelemetryData() {
    this.inViewLogs = []; // set to empty every time filter or page changes
    this.closeIntractEdata = {
      id: 'search-close',
      type: 'click',
      pageid: 'course-search'
    };
    this.cardIntractEdata = {
      id: 'course-card',
      type: 'click',
      pageid: 'course-search'
    };
    this.sortIntractEdata = {
      id: 'sort',
      type: 'click',
      pageid: 'course-search'
    };
  }

  ngAfterViewInit () {
    setTimeout(() => {
      this.telemetryImpression = {
        context: {
          env: this.activatedRoute.snapshot.data.telemetry.env
        },
        edata: {
          type: this.activatedRoute.snapshot.data.telemetry.type,
          pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
          uri: this.router.url,
          subtype: this.activatedRoute.snapshot.data.telemetry.subtype,
          duration: this.navigationhelperService.getPageLoadTime()
        }
      };
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private setNoResultMessage() {
    this.noResultMessage = {
      'message': 'messages.stmsg.m0007',
      'messageText': 'messages.stmsg.m0006'
    };
  }
}
